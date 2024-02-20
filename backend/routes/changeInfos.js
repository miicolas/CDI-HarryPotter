// routes/signup.js

import express from "express";
const router = express.Router();
import { updateProfilInfos } from "../controllers/changeInfosController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import updateInfosValidation from "../middleware/updateInfosValidation.js";

router.post("/changeinfos", authenticateToken, updateInfosValidation, updateProfilInfos); // Vérifie le token et met à jour les infos de l'utilisateur


export default router;