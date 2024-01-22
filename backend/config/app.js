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

app.use(bodyParser.urlencoded({ extended: true })); // Permet de récupérer les données des formulaires
app.use(bodyParser.json()); // Permet de récupérer les données des formulaires
app.use(express.json()); // Permet de récupérer les données des formulaires
app.use(cookieParser()); // Permet de récupérer les cookies


app.use(express.static(path.join(__dirname, "../../frontend"))); // Permet de servir les fichiers statiques du dossier frontend
// Exemple d'utilisation du middleware pour bloquer l'accès à une route

app.get('/profil', authenticateToken, (req, res) => {
  // Si le middleware a réussi la vérification, l'accès à cette route est autorisé
  // Les informations de l'utilisateur sont disponibles dans req.user
  res.sendFile(path.join(__dirname, '../../frontend/profil.html'));
});


// HTML pages routes
// app.get("/login", (req, res) => { 
//   res.sendFile(path.join(__dirname, "../../frontend/login.html"));
// });

// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/signup.html"));
// });

// app.get("/profil", authenticateToken, (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/profil.html"));
// });

// app.get("/settings", authenticateToken, (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
// });

// app.get("/changeinfos", authenticateToken, (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
// });

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
