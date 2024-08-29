const User = require("../modals/UserModel");
const UserProfile = require("../modals/UserProfileModel");
const fs = require("fs");
const path = require("path");

const profileStaff = async (req, res) => {
  try {
    const profile_id = req.params.id;
    const { name, email, address, mobile, gender } = req.body;
    const newImage = req.file ? req.file.filename : null;

    const userProfile = await UserProfile.findOne({ user_id: profile_id });
    const user = await User.findById(profile_id);

    if (userProfile) {
      // If a new image is provided, delete the old image
      if (newImage) {
        if (userProfile.image) {
          const oldImagePath = path.join(
            __dirname,
            "../uploads/profile",
            userProfile.image
          );
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Error deleting old image:", err);
          });
        }
      }

      // user model name and email update
      if (!user) {
        res.status(404).send({ msg: "user not found" });
      }

      const editProfile = await User.findByIdAndUpdate(
        profile_id,
        {
          name: name || user.name,
          email: email || user.email,
        },
        { new: true }
      );

      const updateProfile = await UserProfile.findByIdAndUpdate(
        userProfile._id,
        {
          address: address || userProfile.address,
          mobile: mobile || userProfile.mobile,
          gender: gender || userProfile.gender,
          image: newImage || userProfile.image,
        },
        { new: true }
      );

      res.status(200).send({ profile: updateProfile, user: editProfile });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  profileStaff,
};
