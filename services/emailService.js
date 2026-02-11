const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️ Email credentials not found. OTP will log in console.');
        this.transporter = null;
        return;
      }

      console.log('📧 Using Gmail SMTP (Port 587)');

      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // IMPORTANT: false for 587
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS // Must be App Password
        },
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 20000
      });

      // Verify connection on startup
      this.transporter.verify()
        .then(() => console.log('✅ Email service is ready'))
        .catch(err => console.error('❌ SMTP connection failed:', err));

    } catch (error) {
      console.error('❌ Failed to initialize transporter:', error);
      this.transporter = null;
    }
  }

  async sendOTP(email, otp, name = 'User') {
    try {
      if (!this.transporter) {
        console.log(`🔐 Fallback OTP for ${email}: ${otp}`);
        return { success: false, otp };
      }

      const mailOptions = {
        from: `"QuickMart" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your QuickMart Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width:600px;margin:auto;padding:20px;background:#f9f9f9;">
            <div style="background:#fff;padding:30px;border-radius:10px;">
              <h2 style="color:#2c5aa0;text-align:center;">🛒 QuickMart</h2>
              <p>Hi ${name},</p>
              <p>Your verification code is:</p>
              <div style="text-align:center;margin:25px 0;">
                <span style="font-size:32px;font-weight:bold;color:#2c5aa0;letter-spacing:5px;">
                  ${otp}
                </span>
              </div>
              <p>This code expires in <strong>5 minutes</strong>.</p>
              <p style="font-size:12px;color:#999;text-align:center;margin-top:30px;">
                Do not share this OTP with anyone.
              </p>
            </div>
          </div>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);

      console.log('📧 Email sent successfully:', info.messageId);

      return { success: true, messageId: info.messageId };

    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      console.log(`🔐 FALLBACK OTP for ${email}: ${otp}`);
      return { success: false, error: error.message, otp };
    }
  }
}

module.exports = new EmailService();
