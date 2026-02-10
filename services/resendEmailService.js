const { Resend } = require('resend');

class ResendEmailService {
  constructor() {
    this.resend = null;
    this.fromEmail = 'QuickMart <onboarding@resend.dev>'; // Default Resend email
    this.initialize();
  }

  initialize() {
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend email service initialized');
      
      // Use custom domain if configured
      if (process.env.RESEND_FROM_EMAIL) {
        this.fromEmail = process.env.RESEND_FROM_EMAIL;
      }
    } else {
      console.log('⚠️  RESEND_API_KEY not configured');
    }
  }

  async sendOTP(email, otp, name = 'User') {
    try {
      if (!this.resend) {
        console.log(`🔐 Resend not configured. OTP for ${email}: ${otp}`);
        return { 
          success: false, 
          error: 'Email service not configured',
          otp: otp 
        };
      }

      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to: [email],
        subject: 'Your QuickMart Verification Code',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>QuickMart OTP</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 30px; text-align: center; border-bottom: 1px solid #eee;">
                        <h1 style="color: #2c5aa0; margin: 0; font-size: 28px;">🛒 QuickMart</h1>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Fresh Groceries Delivered in Minutes</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 30px;">
                        <h2 style="color: #333; margin: 0 0 20px 0; font-size: 22px;">Verification Code</h2>
                        
                        <p style="color: #666; font-size: 16px; line-height: 1.5; margin: 0 0 10px 0;">
                          Hi <strong>${name}</strong>,
                        </p>
                        
                        <p style="color: #666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                          Thank you for registering with QuickMart! Please use the verification code below to complete your registration:
                        </p>
                        
                        <!-- OTP Box -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                          <tr>
                            <td align="center">
                              <div style="background-color: #f8f9fa; border: 2px dashed #2c5aa0; border-radius: 8px; padding: 20px; display: inline-block;">
                                <span style="font-size: 32px; font-weight: bold; color: #2c5aa0; letter-spacing: 5px;">${otp}</span>
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Important Info -->
                        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                          <p style="color: #856404; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">
                            ⚠️ Important:
                          </p>
                          <ul style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                            <li>This code will expire in <strong>5 minutes</strong></li>
                            <li>Do not share this code with anyone</li>
                            <li>If you didn't request this code, please ignore this email</li>
                          </ul>
                        </div>
                        
                        <p style="color: #666; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">
                          Happy shopping! 🛍️
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px 30px; border-top: 1px solid #eee; text-align: center; background-color: #f8f9fa;">
                        <p style="color: #999; font-size: 12px; margin: 0 0 5px 0;">
                          This is an automated email. Please do not reply to this message.
                        </p>
                        <p style="color: #999; font-size: 12px; margin: 0;">
                          © 2024 QuickMart. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      });

      if (error) {
        console.error('❌ Resend email error:', error);
        console.log(`🔐 Fallback OTP for ${email}: ${otp}`);
        return { success: false, error: error.message, otp: otp };
      }

      console.log(`✅ OTP email sent successfully to ${email} (ID: ${data.id})`);
      return { success: true, messageId: data.id };
      
    } catch (error) {
      console.error('❌ Failed to send OTP email:', error);
      console.log(`🔐 Fallback OTP for ${email}: ${otp}`);
      return { success: false, error: error.message, otp: otp };
    }
  }

  async testConnection() {
    if (!this.resend) {
      console.log('❌ Resend not configured');
      return false;
    }
    console.log('✅ Resend email service is ready');
    return true;
  }
}

module.exports = new ResendEmailService();
