// middleware/signupValidation.js

async function validateSignup(req, res, next) {
    const { username, password, name } = req.body;
  
    if (!(username && password && name)) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
  
    if (username.length < 1) {
      return res.status(400).json({ error: "Invalid username" });
    }
  
    if (name.length < 1) {
      return res.status(400).json({ error: "Invalid name" });
    }
  
    next();
  }
  
  module.exports = validateSignup;
  