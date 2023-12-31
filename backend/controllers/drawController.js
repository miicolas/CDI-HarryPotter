// controllers/drawController.js
const session = require("express-session");
const { query } = require("../config/queries");

async function getDrawCards(req, res) {
  try {
    const userId = req.user.id;

    const cards = await query(
      "SELECT id_card FROM Cards ORDER BY RAND() LIMIT 5"
    );

    const cards_user = await query(
      "SELECT id_card FROM UsersCards WHERE id_user = ?",
      [userId]
    );

    const cardsToAdd = [];

    for (let i = 0; i < cards.length; i++) { 
      let cardExists = false;
      for (let j = 0; j < cards_user.length; j++) {
        if (cards[i].id_card === cards_user[j].id_card) {
          cardExists = true;
          break;
        }
      }
      if (!cardExists) {
        cardsToAdd.push(cards[i]); // Add the card to cardsToAdd if it's not already in cards_user
        await query("INSERT INTO UsersCards (id_user, id_card) VALUES (?, ?)", [
          userId,
          cards[i].id_card,
        ]);
      }
    }
    
    // console.log("Drawn", cardsToAdd);
    // console.log("Already have", cards);

    const date = new Date();
    const currentTimeStamp = date.getTime(); 
    console.log("currentTimeStamp", currentTimeStamp);

    await query( "UPDATE account SET lastDraw = ? WHERE id = ?", [currentTimeStamp, userId]);

    res.redirect("/profil");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}

module.exports = {
  getDrawCards,
};
