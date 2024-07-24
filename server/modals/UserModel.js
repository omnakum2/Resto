const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "password is required"] },
    role_as: { type: String, required: [true, "role_as is required"] },
    profile_id: { type: String, required: [true, "profile_id is required"] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;