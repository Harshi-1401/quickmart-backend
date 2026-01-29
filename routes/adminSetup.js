const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create admin user
router.get('/create-admin', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@quickmart.com' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Create admin user with plain password
    const admin = new User({
      name: 'Admin User',
      email: 'admin@quickmart.com',
      password: 'admin123', // ✅ plain password
      phone: '8122853115',
      address: 'HQ',
      role: 'admin'
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
