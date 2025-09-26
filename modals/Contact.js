const db = require('../config/database');

class Contact {
  static create(contactData, callback) {
    const { name, email, message } = contactData;
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    
    db.query(query, [name, email, message], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  
  static findAll(callback) {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
}

module.exports = Contact;