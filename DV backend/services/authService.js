const User = require("../models/User");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const bcrypt = require("bcrypt.js");
=======
const bcrypt = require("bcryptjs");
>>>>>>> c2d4f6b5f0d3f0d48bb3bcff6794acd2fd896d85

exports.signup = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = new User({ ...userData, password: hashedPassword });
    await user.save();

    return { id: user._id, email: user.email };
  } catch (error) {
    // console.error("Signup Error:", error.message);
    throw new Error(error);
  }
};

exports.login = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });
    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = this.generateToken(user);
    return { token, user: { name: user.name, id: user._id, email: user.email } };
  } catch (error) {
    // console.error("Login Error:", error.message);
    throw new Error(error.message);
  }
};


exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "72h" }
  );
};


