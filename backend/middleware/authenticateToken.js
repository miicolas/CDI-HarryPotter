// authenticateToken middleware
const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
  const token = req.cookies.AuthToken; // Récupération du token depuis les cookies

  if (!token) {
    return res.sendFile(path.join(__dirname, "../../frontend/index.html")); 
  }

  // Vérification du token
  jwt.verify(token, 'secretKey', (err, decodedToken) => { // Vérification du token
    if (err) {
      console.log ('token invalide', err)
      return res.sendFile(path.join(__dirname, "../../frontend/index.html")); 
    }
    req.user = decodedToken.user; 
    next();
  });
};

module.exports = authenticateToken;