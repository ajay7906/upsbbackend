const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');

// Submit contact form
router.post('/submit', validateContact, contactController.submitContact);

// Get all contacts (for admin purposes)
router.get('/all', contactController.getAllContacts);

module.exports = router;