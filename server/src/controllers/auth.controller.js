const userModel = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALT_ROUNDS = 12; // 12 is for prodution safe
const FULL_NAME_MIN_LENGTH = 2;
const FULL_NAME_MAX_LENGTH = 60;
const PASSWORD_MIN_LENGTH = 8;

const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const sanitizeName = (name) => name.trim().replace(/\s+/g, " ");

// register controller
const registerController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const sanitizedName = sanitizeName(fullName);

    if (sanitizedName.length < FULL_NAME_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Full name must be at least ${FULL_NAME_MIN_LENGTH} characters long.`
      })
    }

    if (sanitizedName.length > FULL_NAME_MAX_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Full name must not exceed ${FULL_NAME_MAX_LENGTH} characters.`,
      });
    }


    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, Email & password are required!",
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invaliid email format.',
      });
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
      });
    }

    const userExists = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (userExists) {
      return res.status(409).json({ // 409 conflict is more accurate than 400
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await userModel.create({
      FullName: sanitizedName,
      email: email.toLowerCase().trim(),
      password: hashPassword,
    });

    // const userResponse = newUser.toObject();
    // delete userResponse.password

    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
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

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    }).select('+password');

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

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

const getMe = async (req, res) => {}
module.exports = { registerController, loginController };
