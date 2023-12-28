// controllers/drawController.js
const { query } = require("../config/queries");

async function drawTime(req, res, next) {
  try {
    const userId = req.user.id;
    const lastDrawTime = req.cookies.drawTime; // Récupérer le dernier temps de tirage depuis les cookies
    const currentTime = Date.now(); // Heure actuelle en millisecondes

    // Vérifier si lastDrawTime est défini dans les cookies
    if (lastDrawTime) {

      const elapsedTime = currentTime - lastDrawTime;
      const twentyFourHoursInMillis = 24 * 60 * 60 * 1000; 

      // Vérifiez si 24 heures se sont écoulées depuis le dernier tirage
      if (elapsedTime < twentyFourHoursInMillis) {
        return res
          .status(403)
          .send(
            "Vous ne pouvez pas tirer de nouvelles cartes pour le moment. Attendez 24 heures."
          );
      }
    } else {
      // Si lastDrawTime n'est pas défini dans les cookies, c'est la première fois que l'utilisateur tire des cartes
      await query("UPDATE account SET firstDraw = true WHERE id = ?", [userId]);

    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}

module.exports = drawTime;
