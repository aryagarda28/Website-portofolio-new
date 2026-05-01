// backend/config/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // ganti sesuai user database Anda
  password: '',       // ganti sesuai password database Anda
  database: 'webportoecommerse',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
