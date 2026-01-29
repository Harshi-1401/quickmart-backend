const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const emailService = require('../services/emailService');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Step 1: Send OTP for registration
router.post('/send-otp', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Basic validation
    if (!email || !phone) {
      return res.status(400).json({ message: 'Email and phone number are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Phone format validation (basic)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return res.status(400).json({ message: 'Please enter a valid phone number' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or phone already exists. Please login instead.' 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Delete any existing OTP for this email/phone combination
    await OTP.deleteMany({ email, phone });
    
    // Store OTP in database
    const otpRecord = new OTP({
      email,
      phone,
      otp
    });
    
    await otpRecord.save();

    // Send OTP via email if credentials are configured, otherwise log to console
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log(`📧 Sending OTP to ${email}...`);
      const emailResult = await emailService.sendOTP(email, otp);
      
      if (!emailResult.success) {
        console.error('Failed to send OTP email:', emailResult.error);
        return res.status(500).json({ 
          message: 'Failed to send OTP. Please try again later.' 
        });
      }
      
      console.log(`✅ OTP sent successfully to ${email}`);
      res.json({ 
        message: 'OTP sent successfully. Please check your email.',
        success: true
      });
    } else {
      // Fallback to console logging when email is not configured
      console.log(`🔐 Development OTP for ${email}/${phone}: ${otp}`);
      console.log('⚠️  Email not configured. Add EMAIL_USER and EMAIL_PASS to .env to send actual emails.');
      
      res.json({ 
        message: 'OTP sent successfully. Please check your email.',
        success: true,
        // Only include OTP in development mode when email is not configured
        developmentOTP: otp
      });
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Resend OTP (same as send-otp but with different messaging)
router.post('/resend-otp', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Basic validation
    if (!email || !phone) {
      return res.status(400).json({ message: 'Email and phone number are required' });
    }

    // Generate new OTP
    const otp = generateOTP();
    
    // Delete any existing OTP for this email/phone combination
    await OTP.deleteMany({ email, phone });
    
    // Store new OTP in database
    const otpRecord = new OTP({
      email,
      phone,
      otp
    });
    
    await otpRecord.save();

    // Send OTP via email if credentials are configured, otherwise log to console
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log(`📧 Resending OTP to ${email}...`);
      const emailResult = await emailService.sendOTP(email, otp);
      
      if (!emailResult.success) {
        console.error('Failed to resend OTP email:', emailResult.error);
        return res.status(500).json({ 
          message: 'Failed to resend OTP. Please try again later.' 
        });
      }
      
      console.log(`✅ OTP resent successfully to ${email}`);
      res.json({ 
        message: 'OTP resent successfully. Please check your email.',
        success: true
      });
    } else {
      // Fallback to console logging when email is not configured
      console.log(`🔐 Development OTP resent for ${email}/${phone}: ${otp}`);
      console.log('⚠️  Email not configured. Add EMAIL_USER and EMAIL_PASS to .env to send actual emails.');
      
      res.json({ 
        message: 'OTP resent successfully. Please check your email.',
        success: true,
        // Only include OTP in development mode when email is not configured
        developmentOTP: otp
      });
    }
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Step 2: Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, phone, otp } = req.body;

    if (!email || !phone || !otp) {
      return res.status(400).json({ message: 'Email, phone, and OTP are required' });
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({ 
      email, 
      phone, 
      otp,
      verified: false
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    res.json({ 
      message: 'OTP verified successfully',
      verified: true
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Step 3: Complete registration
router.post('/register', async (req, res) => {
  try {
    const { email, phone, otp, name, gender, address, password } = req.body;

    // Validate required fields
    if (!email || !phone || !otp || !name || !gender || !address || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find and verify the OTP record
    const otpRecord = await OTP.findOne({ 
      email, 
      phone, 
      otp,
      verified: true
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or unverified OTP. Please verify your OTP first.' });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Check if user already exists (double check)
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      gender,
      address: address.trim(),
      password // Will be hashed by pre-save middleware
    });

    await newUser.save();

    // Clean up OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        gender: newUser.gender,
        address: newUser.address,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
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
        gender: user.gender,
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
      gender: req.user.gender,
      address: req.user.address,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;