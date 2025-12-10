const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

async function testServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📍 Database:', mongoose.connection.name);

    // Test user creation
    const userCount = await User.countDocuments();
    console.log(`📊 Users in database: ${userCount}`);

    // Test product creation
    const productCount = await Product.countDocuments();
    console.log(`📦 Products in database: ${productCount}`);

    if (productCount === 0) {
      console.log('❌ No products found. Run: node scripts/seedProducts.js');
    } else {
      const sampleProduct = await Product.findOne();
      console.log('📝 Sample product:', {
        id: sampleProduct._id,
        name: sampleProduct.name,
        price: sampleProduct.price,
        stock: sampleProduct.stock
      });
    }

    if (userCount === 0) {
      console.log('❌ No users found. Run: node scripts/createAdmin.js');
    } else {
      const adminUser = await User.findOne({ role: 'admin' });
      if (adminUser) {
        console.log('👤 Admin user exists:', adminUser.email);
      } else {
        console.log('❌ No admin user found. Run: node scripts/createAdmin.js');
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testServer();