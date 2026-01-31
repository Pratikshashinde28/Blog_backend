const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { register, login, createProfile, logout } = require("../controllers/authController"); //Imports register and login functions from authController

router.post("/register", register);  //POST-/api/auth/register
router.post("/login", login);        //POST- /api/auth/login
router.post("/profile",auth,createProfile); //POST- /api/auth/profile
router.post("/logout",logout);              // POST-/api/auth/logout

module.exports = router;   //allows server.js to use it