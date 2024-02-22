// routes/profil.js
import express from "express";
const router = express.Router(); // Importation du router d'express qui permet de créer les routes de l'API 
import authenticateToken from "../middleware/authenticateToken.js";
import { addFriend, getFriends, acceptFriend, deleteFriend} from "../controllers/friendsController.js";

router.post("/addfriend", authenticateToken, addFriend); // Vérifie le token et ajoute un ami
router.get("/getfriends", authenticateToken, getFriends); // Vérifie le token et renvoie la liste des amis
router.get("/acceptfriend", authenticateToken, acceptFriend); // Vérifie le token et accepte un ami
router.get("/deletefriend", authenticateToken, deleteFriend); // Vérifie le token et supprime un ami


export default router; // Exportation du router
