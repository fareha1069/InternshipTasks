const express = require("express");
const router = express.Router();
const { createUser, getAllUsers } = require("../controllers/userController");

router.post("/users", createUser);      // To create new user
router.get("/users", getAllUsers);      // To get all users

module.exports = router;
