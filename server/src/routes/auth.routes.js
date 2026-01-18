const express = require("express");
const userModel = require("../models/User.models");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await userModel.create({
            username: req.body.username.toLowerCase(),
            password
        });

        res.status(201).json({
            message: "User registered!",
            newUser
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: 'Username already exists!'
            });
        }
        res.status(500).json({
            message: 'Server error',
        })
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({
        username,
    });
    if (!user) {
        return res.status(404).json({
            message: 'username not exists!',
        })
    }

    res.status(200).json({
        message: "loggedin successful",
        user
    })
});

router.get('/user', async(req, res) => {})

module.exports = router;