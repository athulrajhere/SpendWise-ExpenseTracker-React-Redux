const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currency: { type: String, default: 'USD' },
  language: { type: String, default: 'en' },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  timezone: { type: String },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);