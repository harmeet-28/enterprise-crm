const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");


router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: req.body.role,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;