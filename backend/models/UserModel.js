const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a username to your"],
      // lowercase: true,
      // unique: true,
      // match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      // index: true,
    },
    email: {
      type: String,
      required: [true, "Please add a email address"],
      unique: true,
      // trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
