const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const activityRoutes = require("./routes/activityRoutes");
const emailRoutes = require("./routes/emailRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("CRM API Running Successfully 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.delete("/api/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});