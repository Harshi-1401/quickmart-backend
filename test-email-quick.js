require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');

async function quickEmailTest() {
  console.log('🧪 Quick Email Test...');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Email credentials not found');
    return;
  }
  
  console.log(`📧 Testing with: ${process.env.EMAIL_USER}`);
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    console.log('🔗 Testing connection...');
    await transporter.verify();
    console.log('✅ Connection successful!');
    
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'QuickMart OTP Test',
      text: 'Test OTP: 123456',
      html: '<h2>Test OTP: 123456</h2>'
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Gmail Authentication Issue:');
      console.log('1. Make sure 2-Factor Authentication is enabled');
      console.log('2. Generate a new App Password');
      console.log('3. Use the 16-character app password (not your regular password)');
    }
  }
}

quickEmailTest();