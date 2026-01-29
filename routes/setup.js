const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const { initialProducts } = require('../data/products');

const router = express.Router();

// Manual setup endpoint (for emergency use)
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data (optional)
    const clearData = req.body.clear === true;
    
    if (clearData) {
      await Product.deleteMany({});
      await User.deleteMany({ role: { $ne: 'admin' } }); // Keep admin users
      console.log('🗑️ Cleared existing data');
    }
    
    // Seed products
    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      await Product.insertMany(initialProducts);
      console.log(`📦 Seeded ${initialProducts.length} products`);
    }
    
    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@quickmart.com' });
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin',
        email: 'admin@quickmart.com',
        password: 'admin123',
        phone: '9876543210',
        address: 'QuickMart HQ',
        role: 'admin'
      });
      await adminUser.save();
      console.log('👤 Admin user created');
    }
    
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    
    res.json({
      success: true,
      message: 'Database setup completed',
      data: {
        products: productCount,
        users: userCount,
        adminExists: !!adminExists
      }
    });
    
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Setup failed',
      error: error.message
    });
  }
});

// Check database status
router.get('/status', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const adminExists = await User.findOne({ role: 'admin' });
    
    res.json({
      database: 'connected',
      products: productCount,
      users: userCount,
      adminExists: !!adminExists,
      sampleProducts: productCount > 0 ? await Product.find().limit(3) : []
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Test email endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    console.log(`🧪 Testing email sending to ${email}...`);
    
    // First test connection
    const isConnected = await emailService.testConnection();
    if (!isConnected) {
      return res.status(500).json({ 
        success: false, 
        error: 'Email service connection failed. Check server logs for details.' 
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const result = await emailService.sendOTP(email, otp, 'Test User');

    if (result.success) {
      res.json({ success: true, message: 'Test email sent successfully', messageId: result.messageId });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;