const express = require("express");
const router = express.Router();

const Lead = require("../models/Lead");
const Activity = require("../models/Activity");


router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);

    await lead.save();

    await Activity.create({
      action: `Lead Added: ${lead.name}`,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    await Activity.create({
      action: `Lead Updated: ${updatedLead.name}`,
    });

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    await Lead.findByIdAndDelete(req.params.id);

    await Activity.create({
      action: `Lead Deleted: ${lead.name}`,
    });

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;