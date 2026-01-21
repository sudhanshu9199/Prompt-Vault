const express = require("express");
const userModel = require("../models/User.models");
const { registerController, loginController } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get('/user', async(req, res) => {})

module.exports = router;