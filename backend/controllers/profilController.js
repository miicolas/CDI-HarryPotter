import { query } from "../config/queries.js";

export async function getProfil(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    if (!userId) {
      // Si l'id n'est pas défini, l'utilisateur n'est pas connecté
      return res.redirect("dashboard");
    }
    console.log(userId);

    const userInfo = await query(
      "SELECT username, lastDraw FROM Users WHERE id = ?",
      [userId]
    ); // Récupère les infos de l'utilisateur à partir de l'id

    console.log(userInfo);
    if (userInfo.length === 0) {
      // Si l'utilisateur n'a pas d'infos, il n'est pas connecté
      return res.redirect("dashboard");
    }

    const numberCards = await query(
      "SELECT COUNT(*) FROM UsersCards WHERE id_user = ?",
      [userId]
    ); // Récupère le nombre de cartes de l'utilisateur à partir de l'id

    const cards_user = await query(
      "SELECT * FROM Cards JOIN UsersCards ON cards.id_card = UsersCards.id_card WHERE id_user = ?",
      [userId]
    ); // Récupère les cartes de l'utilisateur à partir de l'id

    let message = ""; // Initialise le message si l'utilisateur n'a pas de cartes

    if (cards_user.length === 0) {
      // Si l'utilisateur n'a pas de cartes, affiche un message
      message = "Vous n'avez pas encore de cartes";
    }
    
    const lastDraw = userInfo[0].lastDraw; // Récupère la date du dernier tirage
    const currentTime = new Date().getTime(); // Obtenir le temps actuel et le temps restant jusqu'au prochain tirage
    const timeLeft = lastDraw + 24 * 60 * 60 * 1000 - currentTime; // Ajouter 24 heures en millisecondes pour le prochain tirage
    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000)); // Calcul des heures restantes
    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000)); // Calcul des minutes restantes;

    const remaningTime = hoursLeft + minutesLeft;
    console.log(remaningTime);

    if (hoursLeft < 0 || minutesLeft < 0)
    {
      res.status(200).json({
        username: userInfo[0].username,
        cards: cards_user,
        message: message,
        numberCards: numberCards[0]["COUNT(*)"],
        remaningTime: 'Tirer vos cartes',
      });
    } else {
      res.status(200).json({
        username: userInfo[0].username,
        cards: cards_user,
        message: message,
        numberCards: numberCards[0]["COUNT(*)"],
        remaningTime: hoursLeft + "h " + minutesLeft + "m",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération du profil de l'utilisateur",
      });
  }
}

export async function getProfilSettings(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token

    const userInfo = await query(
      "SELECT username, email, lastDraw FROM Users WHERE id = ?",
      [userId] // Récupère les infos de l'utilisateur à partir de l'id
    );

    if (userInfo.length === 0) {
      // Si l'utilisateur n'a pas d'infos, il n'est pas connecté
      return res.redirect("login");
    }
    
    const lastDraw = userInfo[0].lastDraw; // Récupère la date du dernier tirage
    const currentTime = new Date().getTime(); // Obtenir le temps actuel et le temps restant jusqu'au prochain tirage
    const timeLeft = lastDraw + 24 * 60 * 60 * 1000 - currentTime; // Ajouter 24 heures en millisecondes pour le prochain tirage
    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000)); // Calcul des heures restantes
    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000)); // Calcul des minutes restantes

    if (hoursLeft < 0 || minutesLeft < 0) {
      // Si le temps restant est négatif, le prochain tirage est disponible
      res.status(200).json({
        username: userInfo[0].username,
        name: userInfo[0].name,
        email: userInfo[0].email,
        hoursLeft: 0,
        minutesLeft: 0,
      });
    } else {
      // Sinon, le prochain tirage n'est pas encore disponible
      res.status(200).json({
        username: userInfo[0].username,
        name: userInfo[0].name,
        email: userInfo[0].email,
        hoursLeft: hoursLeft,
        minutesLeft: minutesLeft,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération du profil de l'utilisateur",
    });
  }
}

