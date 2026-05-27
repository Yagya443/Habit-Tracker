const express = require("express");
const authMiddleware = require("../config/auth.middleware");
const { signup, login, getMe } = require("../controllers/User.controllers.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

module.exports = router;
