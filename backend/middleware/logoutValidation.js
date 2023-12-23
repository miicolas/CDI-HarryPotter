// middleware/logoutValidation.js

async function validateLogout(req, res, next) {
    
    const token = req.cookies.AuthToken;
    if (token === undefined || token === null) {
        return res.status(400).json({ error: "No token" });
    }
    next();
}

module.exports = validateLogout;
  