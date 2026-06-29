const express = require("express");
const router = express.Router();

const Activity = require("../models/Activity");

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;