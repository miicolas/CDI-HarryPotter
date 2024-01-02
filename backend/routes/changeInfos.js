// routes/signup.js

const express = require("express");
const router = express.Router();
const changeInfosController = require("../controllers/changeInfosController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/changeinfos", authenticateToken, changeInfosController.updateProfilInfos);

module.exports = router;
