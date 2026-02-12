const sgMail = require('@sendgrid/mail');

class SendGridEmailService {
  constructor() {
    this.initialized = false;
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@quickmart.com';
    this.initialize();
  }

  initialize() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      this.initialized = true;
      console.log('✅ SendGrid email service initialized');
    } else {
      console.log('⚠️  SENDGRID_API_KEY not configured');
    }
  }

  async sendOTP(email, otp, name = 'User') {
    try {
      if (!this.initialized) {
        console.log(`🔐 SendGrid not configured. OTP for ${email}: ${otp}`);
        return { 
          success: false, 
          error: 'Email service not configured',
          otp: otp 
        };
      }

      const msg = {
        to: email,
        from: this.fromEmail,
        subject: 'Your QuickMart Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2c5aa0; margin: 0; font-size: 28px;">🛒 QuickMart</h1>
                <p style="color: #666; margin: 5px 0 0 0;">Fresh Groceries Delivered in Minutes</p>
              </div>
              
              <h2 style="color: #333; margin-bottom: 20px;">Verification Code</h2>
              
              <p style="color: #666; font-size: 16px; line-height: 1.5;">
                Hi ${name},
              </p>
              
              <p style="color: #666; font-size: 16px; line-height: 1.5;">
                Thank you for registering with QuickMart! Please use the verification code below to complete your registration:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #f8f9fa; border: 2px dashed #2c5aa0; border-radius: 8px; padding: 20px; display: inline-block;">
                  <span style="font-size: 32px; font-weight: bold; color: #2c5aa0; letter-spacing: 5px;">${otp}</span>
                </div>
              </div>
              
              <p style="color: #666; font-size: 14px; line-height: 1.5;">
                <strong>Important:</strong>
              </p>
              <ul style="color: #666; font-size: 14px; line-height: 1.5; padding-left: 20px;">
                <li>This code will expire in <strong>5 minutes</strong></li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this code, please ignore this email</li>
              </ul>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  This is an automated email. Please do not reply to this message.
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                  © 2024 QuickMart. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        `
      };

      await sgMail.send(msg);
      console.log(`✅ OTP email sent successfully to ${email}`);
      return { success: true };
      
    } catch (error) {
      console.error('❌ Failed to send OTP email:', error);
      console.log(`🔐 Fallback OTP for ${email}: ${otp}`);
      return { success: false, error: error.message, otp: otp };
    }
  }

  async testConnection() {
    if (!this.initialized) {
      console.log('❌ SendGrid not configured');
      return false;
    }
    console.log('✅ SendGrid email service is ready');
    return true;
  }
}

module.exports = new SendGridEmailService();
