const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema(
  {
    address: { type: String, required: [true, "Address is required"] },
    mobile: { type: String, required: [true, "Mobile is required"] },
    image: { type: String, required: [true, "Image is required"] },
    gender: { type: String, required: [true, "Gender is required"] },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("profile", userProfileSchema);
module.exports = Profile;
