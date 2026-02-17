const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function initDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    });

    const dbName = process.env.DB_NAME || 'alihaudio';

    console.log(`Checking/Creating database: ${dbName}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    console.log('Creating users table...');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      nipp VARCHAR(50) PRIMARY KEY,
      nama VARCHAR(255) NOT NULL,
      foto_url TEXT,
      satker VARCHAR(255),
      jabatan VARCHAR(255),
      email VARCHAR(255),
      last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

    console.log('Creating conversions table...');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS conversions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_nipp VARCHAR(50),
      text_input LONGTEXT NOT NULL,
      mode VARCHAR(50),
      lang VARCHAR(50),
      provider VARCHAR(50),
      audio_path TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_nipp) REFERENCES users(nipp)
    );
  `);

    console.log('Database initialized successfully!');
    await connection.end();
}

initDB().catch(console.error);
