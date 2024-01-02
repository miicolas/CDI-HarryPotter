const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authenticateToken = require('../middleware/authenticateToken');
const signupRoute = require("../routes/signup");
const loginRoute = require("../routes/login");
const logoutRoute = require("../routes/logout");
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
app.use(cookieParser());

// Configuration pour servir les fichiers statiques (CSS, JavaScript, images)
app.use(express.static(path.join(__dirname, "../../public")));

// Configuration pour utiliser EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes pour les pages HTML
app.get("/login", (req, res) => {
  const userLoggedIn = req.cookies.AuthToken || req.user;
  res.render('login', { userLoggedIn}); // Rendre login.ejs
});

app.get("/signup", (req, res) => {
  const userLoggedIn = req.cookies.AuthToken || req.user;
  res.render('signup',{ userLoggedIn }); // Rendre signup.ejs
});



// Utilisation des routes
app.use("/", signupRoute); 
app.use("/", loginRoute);
app.use("/", logoutRoute);
app.use("/", profilRoute);
app.use("/", indexRoute);
app.use("/", drawRoute);
app.use("/", settingsRoute);
app.use("/", changeInfosRoute);
app.listen(port, () => console.log(`Listening on port ${port}`));