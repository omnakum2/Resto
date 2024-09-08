const User = require("../modals/UserModel");
const UserProfile = require("../modals/UserProfileModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// new user register
const register = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const useremail = await User.findOne({ email });

    if (useremail) {
      res.status(409).json({ msg: `User already exists with ${email} email` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status,
    });
    await newUser.save();

    // Create a profile for the new user
    const newProfile = new UserProfile({
      user_id: newUser._id,
    });
    await newProfile.save();

    // const token = generateToken(newUser);
    res.status(201).json({ msg: "User created", profile: newProfile });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get staff user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserProfile.findOne({ user_id: id }).populate("user_id");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all staff users
const getAllStaff = async (req, res) => {
  try {
    const users = await User.find({ role: "staff" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// update user
const editUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate the status value
    if (!status || (status !== "active" && status !== "deactive")) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    // Find the user by ID and update its status
    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Compare the current password with the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Current password is incorrect" });
    }

    // Hash the new password and update the user record
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save();

    res.status(200).send({ msg: "Password reset successful" });
  } catch (error) {
    // console.error('Error resetting password:', error);
    res.status(500).send("Server error");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not Exists" });
    }

    // Generate OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 300000; // OTP valid for 5 minutes

    await user.save();

    const mailOptions = {
      to: email,
      from: "no-reply@FoodCourt.com",
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getAllStaff,
  getUser,
  editUser,
  deleteUser,
  toggleStatus,
  resetPassword,
  forgotPassword,
  changePassword,
};
