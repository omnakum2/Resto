const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../modals/UserModel");

const newUser = async (req, res) => {
  try {
    const { name, email, password, status, role_as } = req.body;

    if (!(name && email && password)) {
      return res.status(400).send({ msg: "All fields are Required" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(409).send({ msg: `User with ${email} already exists` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      status,
      role_as,
    });

    // generate a token for user and send it
    const token = jwt.sign(
      { id: user._id, email },
      "foodcourt", //process.env.jwtsecret
      {
        expiresIn: "1h",
      }
    );

    user.token = token;
    user.password = undefined;

    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
    newUser
}