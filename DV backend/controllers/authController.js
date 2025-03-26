const AuthService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const user = await AuthService.signup(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Google Authentication
exports.googleAuth = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Google authentication failed" });
  }

  const token = AuthService.generateToken(req.user);
  res.status(200).json({ token, user: req.user });
};
