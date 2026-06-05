const express = require("express");

const {
    createHabit,
    getHabit,
    deleteHabit,
    editHabit,
    archiveHabit,
} = require("../controllers/Habit.controllers");
const authMiddleware = require("../config/auth.middleware");

const router = express.Router();

router.post("/createHabit", authMiddleware, createHabit);
router.get("/getHabit", authMiddleware, getHabit);
router.delete("/deleteHabit/:id", authMiddleware, deleteHabit);
router.put("/editHabit/:id", authMiddleware, editHabit);
router.put("/archiveHabit/:id", authMiddleware, archiveHabit);      

module.exports = router;
