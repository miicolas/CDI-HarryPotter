// middleware/authValidation.js
import {query} from "../config/queries.js";
import {hashPassword} from "../lib/utils.js";


export async function validateLogin(req, res, next) {
    try {
        const {email, password} = req.body; // Récupère les données de l'utilisateur depuis le corps de la requête
        console.log(email, password);
        const result = await query("SELECT * FROM Users WHERE email = ?", [ // Vérifie si l'email existe dans la base de données
            email,
        ]);

        if (result.length === 0) { // Si l'email n'existe pas dans la base de données
            return res.status(400).json({error: "Le compte n'existe pas"});
        }

        const hashedPassword = result[0].password;  // Récupère le mot de passe hashé depuis la base de données

        const hashingPassword = await hashPassword(password); // Hash le mot de passe entré par l'utilisateur

        if (hashedPassword !== hashingPassword) { // Compare les mots de passe
            return res.status(400).json({error: "Mot de passe incorrect"});
        }
        console.log(hashedPassword, hashingPassword);
        req.user = result[0]; // Ajoute les données de l'utilisateur à l'objet req
        console.log('check')
        next(); // Passe au middleware ou à la fonction suivante si la connexion est valide
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erreur de connexion"});
    }
}

export async function validateLogout(req, res, next) {

    const token = req.cookies.AuthToken;
    if (token === undefined || token === null) {
        return res.status(400).json({error: "Pas de token"});
    }
    next();
}

export async function validateSignup(req, res, next) {
    const {username, password, name, email} = req.body;

    if (!(username && password && name && email)) {
        return res.status(400).json({error: "Tous les champs sont requis"});
    }

    if (password.length < 8) {
        return res.status(400).json({error: "Le mot de passe doit contenir au moins 8 caractères"});
    }

    if (username.length < 1) {
        return res.status(400).json({error: "Nom d'utilisateur invalide"});
    }

    if (name.length < 1) {
        return res.status(400).json({error: "Nom invalide"});
    }
    if (email.length < 1) {
        return res.status(400).json({error: "Email invalide"});
    }
    next();
}

