// routes/index.js
import express from "express";
const router = express.Router();
import { getAllCards } from "../controllers/cardController.js";


router.get("/cards", getAllCards); // Renvoie toutes les cartes de la base de données

export default router;
