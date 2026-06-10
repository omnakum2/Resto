const AppDataSource = require("../config/database");
const UserEntity = require("../entities/UserEntity");
const UserProfileEntity = require("../entities/UserProfileEntity");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const userRepository = AppDataSource.getRepository(UserEntity);
const profileRepository = AppDataSource.getRepository(UserProfileEntity);

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// new user register
const register = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const useremail = await userRepository.findOneBy({ email });

    if (useremail) {
      return res.status(409).json({ msg: `User already exists with ${email} email` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      status,
    });
    await userRepository.save(newUser);

    // Create a profile for the new user
    const newProfile = profileRepository.create({
      user: newUser,
    });
    await profileRepository.save(newProfile);

    res.status(201).json({ msg: "User created", profile: newProfile });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });

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
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get staff user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await profileRepository.findOne({
      where: { user: { id: parseInt(id) } },
      relations: ["user"],
    });
    if (!profile) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all staff users
const getAllStaff = async (req, res) => {
  try {
    const users = await userRepository.findBy({ role: "staff" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// update user
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ msg: "User not found" });

    userRepository.merge(user, req.body);
    const updatedUser = await userRepository.save(user);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userRepository.delete(id);
    if (result.affected === 0)
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

    if (!status || (status !== "active" && status !== "deactive")) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const user = await userRepository.findOneBy({ id: parseInt(id) });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.status = status;
    await userRepository.save(user);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await userRepository.findOneBy({ id: parseInt(userId) });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await userRepository.save(user);

    res.status(200).send({ msg: "Password reset successful" });
  } catch (error) {
    res.status(500).send("Server error");
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
  resetPassword
};
