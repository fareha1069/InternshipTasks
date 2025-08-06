const pool = require("../config/db");

// 🧾 Insert new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, password];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error inserting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📄 Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
