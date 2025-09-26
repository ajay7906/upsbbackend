const Contact = require('../modals/Contact');
const nodemailer = require('nodemailer');

// Configure nodemailer (optional - for sending email notifications)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const contactController = {
  submitContact: async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Save to database
      Contact.create({ name, email, message }, async (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to save contact information'
          });
        }
        
        // Send email notification (optional)
        try {
          const mailOptions = {
            from: email,
            to: process.env.ADMIN_EMAIL || 'admin@upsbindia.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong> ${message}</p>
              <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            `
          };
          
          await transporter.sendMail(mailOptions);
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          // Don't fail the request if email fails
        }
        
        res.status(201).json({
          success: true,
          message: 'Thank you for your message! We will get back to you within 24 hours.',
          data: {
            id: results.insertId,
            name,
            email
          }
        });
      });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },
  
  getAllContacts: (req, res) => {
    Contact.findAll((err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch contacts'
        });
      }
      
      res.status(200).json({
        success: true,
        data: results
      });
    });
  }
};

module.exports = contactController;