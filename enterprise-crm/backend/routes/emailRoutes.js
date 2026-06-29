const express = require("express");
const router = express.Router();

const EmailLog = require("../models/EmailLog");

router.get("/", async (req, res) => {
  try {
    const emails = await EmailLog.find().sort({
      createdAt: -1,
    });

    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const email = new EmailLog({
      to: req.body.to,
      subject: req.body.subject,
      message: req.body.message,
      status: "Sent",
    });

    await email.save();

    res.status(201).json(email);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;