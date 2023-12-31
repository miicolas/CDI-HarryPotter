// routes/signup.js

const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");
const validateSignup = require("../middleware/signupValidation");

router.post("/signup", validateSignup, signupController.signup);

module.exports = router;
