const userModel = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 12; // 12 is for prodution safe

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// register controller
const registerController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const userExists = await userModel.findOne({
      email
    });

    if (userExists) {
      return res.status(409).json({ // 409 conflict is more accurate than 400
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });

    const token = generateToken({ userId: newUser._id, email: newUser.email });
    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return res.status(201)
    .cookie("token", token, COOKIE_OPTIONS)
    .json({
      success: true,
      message: "User registered successfully!",
      user: userResponse,
    });

  } catch (err) {
    console.error("Register Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error. Please try again later.",
    });
  }
};

// login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email}).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credential",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credential",
      });
    }

    const token = generateToken({
      userId: user._id,
      email: user.email,
    });

    return res.status(200)
      .cookie('token', token, COOKIE_OPTIONS)
    .json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('GetMe Error:', err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const logoutController = (req, res) => {
  return res
  .clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  .status(200)
  .json({
    success: true,
    message: "Logged out successfully.",
  });
};
module.exports = { registerController, loginController, getMe, logoutController };
