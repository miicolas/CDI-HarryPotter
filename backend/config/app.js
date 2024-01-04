const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authenticateToken = require('../middleware/authenticateToken');
const authRoute = require("../routes/auth");
const profilRoute = require("../routes/profil");
const indexRoute = require("../routes/index");
const drawRoute = require("../routes/draw");
const settingsRoute = require("../routes/settings");
const changeInfosRoute = require("../routes/changeInfos");
const { query } = require("../config/queries");
const jwt = require("jsonwebtoken");


const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Configuration pour servir les fichiers statiques (CSS, JavaScript, images)
app.use(express.static(path.join(__dirname, "../../frontend")));


// Routes pour les pages HTML
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/signup.html"));
});


app.get("/profil", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/profil.html"));
});

app.get("/settings", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
});



// Utilisation des routes
app.use("/", authRoute); 
app.use("/", profilRoute);
app.use("/", indexRoute);
app.use("/", drawRoute);
app.use("/", settingsRoute);
app.use("/", changeInfosRoute);

// Lancement du serveur
app.listen(port, () => console.log(`Listening on port ${port}`));