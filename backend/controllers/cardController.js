// controllers/profilController.js
import { query } from "../config/queries.js";

export async function getAllCards(req, res) {
  try {
    const cards = await query("SELECT id_card, name , house FROM cards"); // Récupère toutes les cartes de la base de données
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
}
}

export async function getCard(req, res) {
  try {
    const cardId = req.params.id;
    const card = await query("SELECT * FROM cards WHERE id_card = ?", [cardId]);
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}