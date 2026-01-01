require('dotenv').config({ path: './.env' });
const emailService = require('./services/emailService');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function testEmailService() {
  console.log('🧪 Testing Email Service...');
  
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Email credentials not configured.');
    console.log('Please add EMAIL_USER and EMAIL_PASS to your .env file.');
    console.log('Run: node setup-email.js to configure email.');
    rl.close();
    return;
  }
  
  // Test connection
  console.log('🔗 Testing email service connection...');
  const connectionTest = await emailService.testConnection();
  if (!connectionTest) {
    console.log('❌ Email service connection failed. Please check your email configuration.');
    rl.close();
    return;
  }
  
  console.log('✅ Email service connection successful!');
  
  // Ask for test email
  const testEmail = await askQuestion('\n📧 Enter your email address to receive test OTP: ');
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
  
  rl.close();
}

// Run the test
testEmailService().catch(console.error);