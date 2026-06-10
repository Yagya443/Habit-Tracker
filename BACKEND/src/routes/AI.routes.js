const express = require("express");
const getRecommendations = require("../controllers/AI.controllers");
const authMiddleware = require("../config/auth.middleware");


const router = express.Router();

router.post("/recommendations", authMiddleware, getRecommendations);

module.exports = router;
