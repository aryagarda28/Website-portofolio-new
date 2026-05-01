// backend/setup.js
// Jalankan SEKALI untuk: fix password admin & user + buat tabel comments
// Perintah: node setup.js
const bcrypt = require('bcrypt');
const db = require('./config/db');

async function setup() {
  try {
    console.log('=== Setup Database ===');

    // 1. Buat tabel comments jika belum ada (tanpa FK agar bisa pakai mock data)
    await db.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        portfolio_id INT NOT NULL,
        user_id INT NOT NULL,
        username VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci
    `);
    console.log('[OK] Tabel comments siap.');

    // 2. Fix password admin  →  password: admin123
    const adminHash = await bcrypt.hash('admin123', 10);
    const [adminRes] = await db.query(
      'UPDATE admins SET password = ? WHERE username = ?',
      [adminHash, 'aryagarda28']
    );
    if (adminRes.affectedRows > 0) {
      console.log('[OK] Password admin "aryagarda28" diset ke: admin123');
    } else {
      console.log('[SKIP] Admin "aryagarda28" tidak ditemukan di tabel admins.');
    }

    // 3. Fix password user  →  password: user123
    const userHash = await bcrypt.hash('user123', 10);
    const [userRes] = await db.query(
      'UPDATE users SET password = ? WHERE username = ?',
      [userHash, 'user1']
    );
    if (userRes.affectedRows > 0) {
      console.log('[OK] Password user "user1" diset ke: user123');
    } else {
      console.log('[SKIP] User "user1" tidak ditemukan di tabel users.');
    }

    console.log('\n=== Setup selesai ===');
    console.log('Akun Admin  -> username: aryagarda28  | password: admin123');
    console.log('Akun User   -> username: user1        | password: user123');
    process.exit(0);
  } catch (err) {
    console.error('Setup error:', err.message);
    process.exit(1);
  }
}

setup();
