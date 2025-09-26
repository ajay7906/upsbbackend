const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  // host: 'localhost',
  host:'82.29.162.171',
  // user: process.env.DB_USER || 'root',
  user:'upsb_upsb',
  // password: process.env.DB_PASSWORD || '',
  password: 'upsb1234',
  // database: process.env.DB_NAME || 'upsb_contact_db'
   database:  'upsb_upsb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create contacts table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Contacts table ready');
    }
  });
});

module.exports = connection;