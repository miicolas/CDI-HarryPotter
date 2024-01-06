// controllers/drawController.js
const { query } = require("../config/queries");

async function drawTime(req, res, next) {
  try {
    const userId = req.user.id;
    const lastDrawTime = await query( "SELECT lastDraw FROM account WHERE id = ?", [userId]);
    const currentTime = Date.now(); // Heure actuelle en millisecondes

    if (lastDrawTime.length > 0) { // Si lastDrawTime est défini dans les cookies

      const elapsedTime = currentTime - lastDrawTime[0].lastDraw; // Temps écoulé depuis le dernier tirage en millisecondes
      const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;  // 24 heures en millisecondes

      if (elapsedTime < twentyFourHoursInMillis) { // Si le temps écoulé est inférieur à 24 heures
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
