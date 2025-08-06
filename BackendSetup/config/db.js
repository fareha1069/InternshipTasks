const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

// Optional: To check connection manually
pool
  .query("SELECT NOW()")
  .then(() => console.log("⏱ DB connection test successful"))
  .catch((err) => console.error("❌ DB connection failed:", err));

module.exports = pool;
