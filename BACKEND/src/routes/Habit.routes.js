const express = require("express");

const { createHabit } = require("../controllers/Habit.controllers");
const authMiddleware = require("../config/auth.middleware");

const router = express.Router();

router.post("/createHabit", authMiddleware, createHabit);

module.exports = router;
