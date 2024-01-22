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
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url); // Equivalent to __filename in Node.js
const __dirname = path.dirname(__filename); // Equivalent to __dirname in Node.js

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "../../frontend")));


// HTML pages routes
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

app.get("/changeinfos", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
});

// Use routes
app.use("/", authRoute);
app.use("/", profilRoute);
app.use("/", indexRoute);
app.use("/", drawRoute);
app.use("/", changeInfosRoute);

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
