const userModel = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username & password are required!",
      });
    }
    const userExists = await userModel.findOne({
      username: username.toLowerCase(),
    });

    if (userExists) {
      return res.status(400).json({
        message: "Username already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username: username.toLowerCase(),
      password: hashPassword,
    });

    const userResponse = newUser.toObject();
    // delete userResponse.password

    res.status(201).json({
      message: "User registered successfully!",
      user: userResponse,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: username.toLowerCase(),
    });
    if (!user) {
      return res.status(404).json({
        message: "Invalid credential",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "default_secret_key",
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login Error", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { registerController, loginController };
