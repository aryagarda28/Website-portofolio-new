// Script sementara untuk import database ke Railway MySQL
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function importDB() {
  console.log('Connecting to Railway MySQL...');
  const conn = await mysql.createConnection({
    host: 'switchback.proxy.rlwy.net',
    port: 37450,
    user: 'root',
    password: 'EiselJiTLnZehIIweKXvUxGbvPAHCDZp',
    database: 'railway',
  });
  console.log('Connected!');

  const adminHash = await bcrypt.hash('admin123', 10);
  const userHash = await bcrypt.hash('user123', 10);
  console.log('Hashes generated');

  await conn.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id int(11) NOT NULL AUTO_INCREMENT,
      username varchar(50) NOT NULL,
      email varchar(100) DEFAULT NULL,
      password varchar(255) NOT NULL,
      created_at timestamp NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (id),
      UNIQUE KEY username (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id int(11) NOT NULL AUTO_INCREMENT,
      username varchar(50) NOT NULL,
      email varchar(100) DEFAULT NULL,
      password varchar(255) NOT NULL,
      created_at timestamp NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (id),
      UNIQUE KEY username (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS portfolio (
      id int(11) NOT NULL AUTO_INCREMENT,
      title varchar(100) DEFAULT NULL,
      description text DEFAULT NULL,
      image varchar(255) DEFAULT NULL,
      link varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS certificates (
      id int(11) NOT NULL AUTO_INCREMENT,
      title varchar(100) DEFAULT NULL,
      issuer varchar(100) DEFAULT NULL,
      date date DEFAULT NULL,
      file varchar(255) DEFAULT NULL,
      description text DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      portfolio_id INT NOT NULL,
      user_id INT NOT NULL,
      username VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  console.log('Tables created!');

  await conn.query(
    'INSERT INTO admins (id, username, email, password) VALUES (1, ?, ?, ?) ON DUPLICATE KEY UPDATE password=VALUES(password)',
    ['aryagarda28', 'aryagarda11@gmail.com', adminHash]
  );

  await conn.query(
    'INSERT INTO users (id, username, email, password) VALUES (1, ?, ?, ?) ON DUPLICATE KEY UPDATE password=VALUES(password)',
    ['user1', 'agp28@yahoo.com', userHash]
  );

  console.log('Data inserted!');
  console.log('Admin: aryagarda28 / admin123');
  console.log('User:  user1 / user123');

  await conn.end();
  console.log('Done!');
}

importDB().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
