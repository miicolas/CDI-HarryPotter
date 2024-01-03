const { query } = require("../config/queries");

async function getProfilInfos(req, res) {
  try {
    const userId = req.user.id;

    const userInfo = await query(
      "SELECT username, name, email, lastDraw FROM account WHERE id = ?",
      [userId]
    );
    if (userInfo.length === 0) {
      return res.redirect("login");
    }

    // remet lastDraw en format de minutes qu'il reste avec le prochain tirage au sort 
    // Convertir le timestamp en date
    const lastDraw = userInfo[0].lastDraw;
    const lastDrawDate = new Date(lastDraw);

    // Obtenir le temps actuel et le temps restant jusqu'au prochain tirage
    const currentTime = new Date().getTime();
    const timeLeft = lastDraw + 24 * 60 * 60 * 1000 - currentTime; // Ajouter 24 heures en millisecondes pour le prochain tirage
    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000)); // Calcul des heures restantes
    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000)); // Calcul des minutes restantes



    res.render("settings", {
      username: userInfo[0].username,
      name: userInfo[0].name,
      email: userInfo[0].email,
    minutesLeft: minutesLeft,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération du profil de l'utilisateur",
      });
  }
}
module.exports = { getProfilInfos };
