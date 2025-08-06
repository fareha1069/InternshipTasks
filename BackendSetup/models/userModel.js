const pool = require("../config/db");

// Create table if not exists (optional, good for first-time setup)
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    )
  `;

  try {
    await pool.query(query);
    console.log("✅ Users table created (if not exists)");
  } catch (err) {
    console.error("❌ Error creating users table:", err);
  }
};

// Call the function immediately (you can remove it later)
createUserTable();

module.exports = {
  // you can export user-related queries here later
};
