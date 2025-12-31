const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validate email and phone for registration
router.post('/validate-email', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Check if email exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Email does not exist in our system' });
    }

    // Check if phone number matches the existing user
    if (existingUser.phone !== phone.replace(/\D/g, '')) {
      return res.status(400).json({ message: 'Email and phone number do not match' });
    }

    // Check if user already has a password (already registered)
    if (existingUser.password) {
      return res.status(400).json({ message: 'User already registered. Please login instead.' });
    }

    res.json({ message: 'Email and phone verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Find existing user (should exist from validation)
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Email not found. Please validate your email first.' });
    }

    // Check if phone matches
    if (existingUser.phone !== phone.replace(/\D/g, '')) {
      return res.status(400).json({ message: 'Phone number does not match the registered email.' });
    }

    // Check if already has password (already registered)
    if (existingUser.password) {
      return res.status(400).json({ message: 'User already registered. Please login instead.' });
    }

    // Update existing user with password and address
    existingUser.name = name;
    existingUser.password = password; // Will be hashed by pre-save middleware
    existingUser.address = address;
    
    await existingUser.save();

    // Generate token
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        role: existingUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;