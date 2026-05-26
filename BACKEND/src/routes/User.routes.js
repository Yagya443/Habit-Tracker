const  express = require("express");
const  {signup} = require("../controllers/User.controllers.js");
const  {login} = require("../controllers/User.controllers.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports=router;
