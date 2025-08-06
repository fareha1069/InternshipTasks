const express = require("express");
require("dotenv").config();
const pool = require("./config/db");
require("./models/userModel");

const app = express();
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes); // 👈 Connect user routes

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
