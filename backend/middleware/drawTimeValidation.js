// controllers/drawController.js
import { query } from "../config/queries.js";

export default async function drawTime(req, res, next) {
  try {
    const userId = req.user.id;
    const lastDrawTime = await query( "SELECT lastDraw FROM db.users WHERE id = ?", [userId]);
    const currentTime = Date.now(); // Heure actuelle en millisecondes
    // console.log(lastDrawTime);

    if (lastDrawTime !== null && lastDrawTime !== undefined) { // Si lastDrawTime est défini et différent de null

      const elapsedTime = currentTime - lastDrawTime[0].lastDraw; // Temps écoulé depuis le dernier tirage en millisecondes
      const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;  // 24 heures en millisecondes

      // console.log("elapsedTime = ", elapsedTime);
      // console.log("twentyFourHoursInMillis = ", twentyFourHoursInMillis);
      // const result = twentyFourHoursInMillis - elapsedTime;
      // console.log("result = ", result);
      if (elapsedTime < twentyFourHoursInMillis) { // Si le temps écoulé est inférieur à 24 heures
        return res
          .status(403)
          .send(
            "Vous ne pouvez pas tirer de nouvelles cartes pour le moment. Attendez 24 heures."
          );

      }
    } else {
      // Si lastDrawTime n'est pas défini, c'est la première fois que l'utilisateur tire des cartes
      await query("UPDATE db.users SET firstDraw = true WHERE id = ?", [userId]);
      console.log("firstDraw = true");

    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}

