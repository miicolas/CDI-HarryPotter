// controllers/loginController.js
const path = require("path");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const user = req.user; 
    const token = jwt.sign({ user }, "secretKey");
    res.cookie("AuthToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    }).redirect('/profil.html');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
}

module.exports = {
  login,
};
