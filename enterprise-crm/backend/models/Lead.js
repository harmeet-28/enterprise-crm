const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  phone: String,
  company: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Won", "Lost"],
    default: "New"
  }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);