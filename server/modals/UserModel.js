const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "password is required"] },
    status: {
      type: String,
      default: "active",
      required: [true, "status is required"],
    },
    role_as: {
      type: String,
      default: "staff",
      required: [true, "role_as is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
