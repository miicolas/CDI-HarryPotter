// authenticateToken middleware
const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
  const token = req.cookies.AuthToken; // Récupération du token depuis les cookies

  if (!token) {
    return res.redirect('/'); // Redirection vers la page de connexion si le token est manquant
  }

  // Vérification du token
  jwt.verify(token, 'secretKey', (err, decodedToken) => { // Vérification du token
    if (err) {
      console.log ('token invalide', err)
      return res.redirect('/');
    }
    req.user = decodedToken.user; 
    next();
  });
};

module.exports = authenticateToken;