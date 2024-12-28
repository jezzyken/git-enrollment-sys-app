const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const login = async (email, password) => {
  console.log("Login attempt:", email);
  
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate("role");
  console.log("User found:", user ? "yes" : "no");

  if (!user) {
    throw new AppError("No user found with this email", 401);
  }

  if (user.accountStatus === "inactive") {
    throw new AppError("Your account is inactive", 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  console.log("Password valid:", isPasswordValid);
  
  if (!isPasswordValid) {
    throw new AppError("Incorrect password", 401);
  }

  user.password = undefined;
  const token = generateToken(user);
  
  console.log("Login successful");
  return {
    user,
    token,
  };
};

module.exports = {
  login,
  generateToken,
};
