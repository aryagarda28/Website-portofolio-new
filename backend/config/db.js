// backend/config/db.js
const mysql = require('mysql2');

let pool;
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  pool = mysql.createPool({
    host: url.hostname,
    port: parseInt(url.port || '3306'),
    user: url.username,
    password: url.password,
    database: url.pathname.replace('/', ''),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false },
  });
} else {
  const isExternal = process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1';
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'webportoecommerse',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ...(isExternal && { ssl: { rejectUnauthorized: false } }),
  });
}

module.exports = pool.promise();
