const express = require("express");
const userModel = require("../models/User.models");
const { registerController, loginController, getMe, logoutController } = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require('../validators/auth.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const { authLimiter } = require("../middlewares/rateLimiter.middleware");

const router = express.Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", authLimiter, validate(loginSchema), loginController);
router.post("/logout", logoutController);

router.get('/me', authMiddleware, getMe);
module.exports = router;