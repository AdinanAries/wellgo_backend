// Store Token for Password Reset
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailVerificationCodeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
});

module.exports = mongoose.model('EmailVerification', emailVerificationCodeSchema);
