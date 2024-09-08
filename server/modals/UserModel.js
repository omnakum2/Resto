const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "deactive",
    },
    role: {
      type: String,
      enum: ["staff", "admin"],
      default: "staff",
    },
    otp: { type: String, default: "null" },
    otpExpire: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
