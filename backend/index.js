// File: backend/index.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/db');
const { verifyToken, requireAdmin, requireLogin, JWT_SECRET } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://agpportofolio.site',
    'https://www.agpportofolio.site',
    'http://localhost:3000'
  ],
  credentials: true
}));
// limit 10mb untuk kirim gambar base64
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── LOGIN ────────────────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username dan password wajib diisi' });
  try {
    // Cek tabel admins terlebih dahulu
    const [admins] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (admins.length > 0) {
      const match = await bcrypt.compare(password, admins[0].password);
      if (match) {
        const token = jwt.sign(
          { id: admins[0].id, username: admins[0].username, role: 'admin' },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return res.json({ token, role: 'admin', id: admins[0].id, username: admins[0].username });
      }
    }
    // Cek tabel users
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length > 0) {
      const match = await bcrypt.compare(password, users[0].password);
      if (match) {
        const token = jwt.sign(
          { id: users[0].id, username: users[0].username, role: 'user' },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return res.json({ token, role: 'user', id: users[0].id, username: users[0].username });
      }
    }
    return res.status(401).json({ error: 'Username atau password salah' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── REGISTER ────────────────────────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Semua field wajib diisi' });
  try {
    const [exist] = await db.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (exist.length > 0) return res.status(400).json({ error: 'Username atau email sudah terdaftar' });
    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashed]);
    res.json({ message: 'Registrasi berhasil' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PORTFOLIO CRUD ──────────────────────────────────────────────────────────
app.get('/api/portfolio', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM portfolio');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/portfolio', verifyToken, requireAdmin, async (req, res) => {
  const { title, description, image, link } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Judul dan deskripsi wajib diisi' });
  try {
    await db.query(
      'INSERT INTO portfolio (title, description, image, link) VALUES (?, ?, ?, ?)',
      [title, description, image || null, link || null]
    );
    res.json({ message: 'Portfolio berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/portfolio/:id', verifyToken, requireAdmin, async (req, res) => {
  const { title, description, image, link } = req.body;
  try {
    await db.query(
      'UPDATE portfolio SET title = ?, description = ?, image = ?, link = ? WHERE id = ?',
      [title, description, image, link, req.params.id]
    );
    res.json({ message: 'Portfolio berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/portfolio/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
    res.json({ message: 'Portfolio berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── COMMENTS (per portfolio) ─────────────────────────────────────────────────
// GET semua komentar untuk satu portfolio (publik)
app.get('/api/portfolio/:id/comments', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM comments WHERE portfolio_id = ? ORDER BY created_at DESC',
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST tambah komentar (user dan admin yang sudah login)
app.post('/api/portfolio/:id/comments', verifyToken, requireLogin, async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) return res.status(400).json({ error: 'Komentar tidak boleh kosong' });
  try {
    await db.query(
      'INSERT INTO comments (portfolio_id, user_id, username, content) VALUES (?, ?, ?, ?)',
      [req.params.id, req.user.id, req.user.username, content.trim()]
    );
    res.json({ message: 'Komentar berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE komentar (hanya admin)
app.delete('/api/comments/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Komentar berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── SERTIFIKAT CRUD ─────────────────────────────────────────────────────────
app.get('/api/certificates', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM certificates');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/certificates', verifyToken, requireAdmin, async (req, res) => {
  const { title, issuer, date, file, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Judul wajib diisi' });
  try {
    await db.query(
      'INSERT INTO certificates (title, issuer, date, file, description) VALUES (?, ?, ?, ?, ?)',
      [title, issuer || null, date || null, file || null, description || null]
    );
    res.json({ message: 'Sertifikat berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/certificates/:id', verifyToken, requireAdmin, async (req, res) => {
  const { title, issuer, date, file, description } = req.body;
  try {
    await db.query(
      'UPDATE certificates SET title = ?, issuer = ?, date = ?, file = ?, description = ? WHERE id = ?',
      [title, issuer, date, file, description, req.params.id]
    );
    res.json({ message: 'Sertifikat berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/certificates/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await db.query('DELETE FROM certificates WHERE id = ?', [req.params.id]);
    res.json({ message: 'Sertifikat berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
