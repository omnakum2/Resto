const AppDataSource = require("../config/database");
const UserEntity = require("../entities/UserEntity");
const UserProfileEntity = require("../entities/UserProfileEntity");
const fs = require("fs");
const path = require("path");

const userRepository = AppDataSource.getRepository(UserEntity);
const userProfileRepository = AppDataSource.getRepository(UserProfileEntity);

const profileStaff = async (req, res) => {
  try {
    const profile_id = req.params.id; // User ID
    const { name, email, address, mobile, gender } = req.body;
    const newImage = req.file ? req.file.filename : null;

    const userProfile = await userProfileRepository.findOneBy({ user: { id: parseInt(profile_id) } });
    const user = await userRepository.findOneBy({ id: parseInt(profile_id) });

    if (userProfile) {
      if (newImage && userProfile.image) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads/profile",
          userProfile.image
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }

      if (!user) {
        return res.status(404).send({ msg: "user not found" });
      }

      // Update User
      user.name = name || user.name;
      user.email = email || user.email;
      await userRepository.save(user);

      // Update UserProfile
      userProfile.address = address || userProfile.address;
      userProfile.mobile = mobile || userProfile.mobile;
      userProfile.gender = gender || userProfile.gender;
      userProfile.image = newImage || userProfile.image;
      await userProfileRepository.save(userProfile);

      res.status(200).send({ profile: userProfile, user });
    } else {
      res.status(404).send({ msg: "User profile not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  profileStaff,
};

module.exports = {
  profileStaff,
};
