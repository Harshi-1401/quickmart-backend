const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    index: { expireAfterSeconds: 0 } // MongoDB TTL index for automatic cleanup
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for efficient lookups
otpSchema.index({ email: 1, phone: 1 });

module.exports = mongoose.model('OTP', otpSchema);