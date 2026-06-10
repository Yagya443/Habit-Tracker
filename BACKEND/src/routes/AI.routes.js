const express = require("express");
const authMiddleware = require("../config/auth.middleware");
const {
    getRecommendations,
    motivationQuote,
    threeDayPlan,
    weeklyReport,
} = require("../controllers/AI.controllers");

const router = express.Router();

router.post("/recommendations", authMiddleware, getRecommendations);
router.post("/quote", authMiddleware, motivationQuote);
router.post("/threeDaysPlan", authMiddleware, threeDayPlan);
router.post("/weeklyreport", authMiddleware, weeklyReport);

module.exports = router;
