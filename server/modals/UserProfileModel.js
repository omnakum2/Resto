const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema(
  {
    address: { type: String },
    mobile: { type: String },
    image: { type: String },
    gender: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("profile", userProfileSchema);
module.exports = Profile;
