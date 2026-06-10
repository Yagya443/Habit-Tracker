const express = require("express");
const authMiddleware = require("../config/auth.middleware");
const {
    getRecommendations,
    motivationQuote,
    threeDayPlan,
} = require("../controllers/AI.controllers");

const router = express.Router();

router.post("/recommendations", authMiddleware, getRecommendations);
router.post("/quote", authMiddleware, motivationQuote);
router.post("/threeDaysPlan", authMiddleware, threeDayPlan);

module.exports = router;
