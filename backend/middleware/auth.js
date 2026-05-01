// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'porto_secret_key_2026';

/**
 * Middleware: verifikasi JWT dari header Authorization: Bearer <token>
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ditemukan, silakan login terlebih dahulu' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token tidak valid atau sudah kedaluwarsa' });
  }
}

/**
 * Middleware: hanya izinkan role admin
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: hanya admin yang diizinkan' });
  }
  next();
}

/**
 * Middleware: izinkan user yang sudah login (admin maupun user)
 */
function requireLogin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Silakan login terlebih dahulu' });
  }
  next();
}

module.exports = { verifyToken, requireAdmin, requireLogin, JWT_SECRET };
