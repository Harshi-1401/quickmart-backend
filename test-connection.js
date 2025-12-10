const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB Atlas connection...');
    console.log('📍 Connection URI:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database name:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('📡 Ready state:', mongoose.connection.readyState);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('💡 Check username and password in connection string');
    }
    if (error.message.includes('network')) {
      console.error('💡 Check internet connection and firewall settings');
    }
    if (error.message.includes('timeout')) {
      console.error('💡 Check if IP address is whitelisted in MongoDB Atlas');
    }
    
    process.exit(1);
  }
}

testConnection();