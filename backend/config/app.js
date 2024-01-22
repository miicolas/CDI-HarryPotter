// app.js
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authenticateToken from "../middleware/authenticateToken.js";
import authRoute from "../routes/auth.js";
import profilRoute from "../routes/profil.js";
import indexRoute from "../routes/index.js";
import drawRoute from "../routes/draw.js";
import changeInfosRoute from "../routes/changeInfos.js"
import protectedRoutes from "../routes/protectedRoutes.js"
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url); // Permet de récupérer le chemin du fichier
const __dirname = path.dirname(__filename);  // Permet de récupérer le chemin du dossier

const app = express(); // Création de l'application express
const port = process.env.PORT || 3000; // Définition du port d'écoute du serveur

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "../../frontend"))); // Permet de servir les fichiers statiques du dossier frontend
// Exemple d'utilisation du middleware pour bloquer l'accès à une rout


// Use routes
app.use("/", authRoute);
app.use("/", profilRoute);
app.use("/", indexRoute);
app.use("/", drawRoute);
app.use("/", changeInfosRoute);

// Protected routes
app.use("/", protectedRoutes)

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
