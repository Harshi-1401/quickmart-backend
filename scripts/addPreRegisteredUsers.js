const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Pre-registered users (without passwords)
const preRegisteredUsers = [
  {
    name: 'Ganesa SMH',
    email: 'smhsganesa@gmail.com',
    phone: '9489225772'
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    phone: '9876543210'
  },
  {
    name: 'Jane Smith',
    email: 'jane@yahoo.com',
    phone: '9876543211'
  },
  {
    name: 'Mike Johnson',
    email: 'mike@outlook.com',
    phone: '9876543212'
  }
];

async function addPreRegisteredUsers() {
  try {
    console.log('🔄 Adding Pre-registered Users');
    console.log('==============================');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    let createdCount = 0;
    let skippedCount = 0;
    
    for (const userData of preRegisteredUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⏭️  User ${userData.email} already exists`);
        skippedCount++;
        continue;
      }
      
      // Create pre-registered user (without password and address)
      const preUser = new User({
        name: userData.name,
        email: userData.email,
        phone: userData.phone
        // No password or address - will be added during registration
      });
      
      await preUser.save();
      console.log(`✅ Pre-registered: ${userData.name} (${userData.email})`);
      createdCount++;
    }
    
    console.log('\n🎉 Pre-registration completed!');
    console.log('📊 Summary:');
    console.log(`   👥 Total users: ${preRegisteredUsers.length}`);
    console.log(`   ✅ Created: ${createdCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    
    console.log('\n📋 Test Users for Registration:');
    console.log('===============================');
    preRegisteredUsers.forEach(user => {
      console.log(`📧 Email: ${user.email}`);
      console.log(`📱 Phone: ${user.phone}`);
      console.log(`👤 Name: ${user.name}`);
      console.log('---');
    });
    
    console.log('\n🧪 How to Test:');
    console.log('1. Go to registration page');
    console.log('2. Enter email and phone from above list');
    console.log('3. Click "Validate Email & Phone"');
    console.log('4. Complete registration with name, password, and address');
    
  } catch (error) {
    console.error('❌ Error adding pre-registered users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

addPreRegisteredUsers();