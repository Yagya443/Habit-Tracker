const express = require("express");

const {
    createHabit,
    getHabit,
    deleteHabit,
    editHabit,
    archiveHabit,
    completeHabit,
} = require("../controllers/Habit.controllers");
const authMiddleware = require("../config/auth.middleware");

const router = express.Router();

router.post("/createHabit", authMiddleware, createHabit);
router.get("/getHabit", authMiddleware, getHabit);
router.delete("/deleteHabit/:id", authMiddleware, deleteHabit);
router.put("/editHabit/:id", authMiddleware, editHabit);
router.put("/archiveHabit/:id", authMiddleware, archiveHabit);      
router.put("/completeHabit/:id", authMiddleware, completeHabit);      

module.exports = router;
