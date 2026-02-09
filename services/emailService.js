const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      // Check if we have explicit SMTP configuration
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        console.log('📧 Using Custom SMTP Configuration:', process.env.SMTP_HOST);
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          },
          tls: {
            rejectUnauthorized: false // Helps with some self-signed certs or strict firewall issues
          }
        });
      } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        // Default Gmail configuration
        console.log('📧 Using Gmail Configuration');
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
      } else {
        console.log('⚠️  Email service not configured. OTP will be logged to console only.');
        this.transporter = null;
      }
    } catch (error) {
      console.error('❌ Failed to initialize email transporter:', error);
      this.transporter = null;
    }
  }

  async sendOTP(email, otp, name = 'User') {
    try {
      // If transporter is not configured, return error
      if (!this.transporter) {
        console.log(`🔐 Email not configured. OTP for ${email}: ${otp}`);
        return { 
          success: false, 
          error: 'Email service not configured',
          otp: otp // Return OTP for logging purposes
        };
      }

      const mailOptions = {
        from: {
          name: 'QuickMart',
          address: process.env.EMAIL_USER || process.env.SMTP_USER
        },
        to: email,
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

      const info = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email sent successfully:', info.messageId);
        console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
      }
      
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      console.log(`🔐 Fallback OTP for ${email}: ${otp}`);
      return { success: false, error: error.message, otp: otp };
    }
  }

  async testConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ Email service is ready');
      return true;
    } catch (error) {
      console.error('❌ Email service connection failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();