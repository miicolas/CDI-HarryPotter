// controllers/drawController.js
const { query } = require("../config/queries");

async function getDrawCards(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token

    const cards = await query( // Récupère 5 cartes aléatoires
      "SELECT id_card FROM Cards ORDER BY RAND() LIMIT 5"
    );

    const cards_user = await query( // Récupère les cartes de l'utilisateur à partir de l'id
      "SELECT id_card FROM UsersCards WHERE id_user = ?",
      [userId]
    );

    const cardsToAdd = []; // Initialise un tableau pour les cartes à ajouter

    for (let i = 0; i < cards.length; i++) { // Parcours les cartes tirées
      let cardExists = false; // Initialise une variable pour vérifier si la carte existe déjà
      for (let j = 0; j < cards_user.length; j++) { // Parcours les cartes de l'utilisateur
        if (cards[i].id_card === cards_user[j].id_card) { // Si la carte tirée existe déjà dans cards_user, cardExists est vrai
          cardExists = true;
          break; 
        }
      }
      if (!cardExists) { // Si la carte n'existe pas, on l'ajoute à cardsToAdd
        cardsToAdd.push(cards[i]); //
        await query("INSERT INTO UsersCards (id_user, id_card) VALUES (?, ?)", [ // Ajoute la carte à la table UsersCards
          userId,
          cards[i].id_card,
        ]); 
      }
    }

    const date = new Date(); // Récupère la date actuelle
    const currentTimeStamp = date.getTime(); // Récupère le timestamp de la date actuelle
    // console.log("currentTimeStamp", currentTimeStamp);

    await query("UPDATE account SET lastDraw = ? WHERE id = ?", [
      currentTimeStamp,
      userId,
    ]); // Met à jour le timestamp du dernier tirage
    res.redirect("/profil");
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}

module.exports = {
  getDrawCards,
};
