require('dotenv').config({ path: './.env' });
const emailService = require('./services/emailService');

async function testEmailService() {
  console.log('🧪 Testing Email Service...');
  
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Email credentials not configured.');
    return;
  }
  
  console.log(`📧 Email configured: ${process.env.EMAIL_USER}`);
  
  // Test connection
  console.log('🔗 Testing email service connection...');
  const connectionTest = await emailService.testConnection();
  if (!connectionTest) {
    console.log('❌ Email service connection failed.');
    return;
  }
  
  console.log('✅ Email service connection successful!');
  
  // Send test email to your own address
  const testEmail = 'harshisvc@gmail.com';
  const testOTP = '123456';
  
  console.log(`📧 Sending test OTP to ${testEmail}...`);
  
  const result = await emailService.sendOTP(testEmail, testOTP, 'Test User');
  
  if (result.success) {
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📬 Please check your email inbox (and spam folder)');
  } else {
    console.log('❌ Test email failed:', result.error);
  }
}

// Run the test
testEmailService().catch(console.error);