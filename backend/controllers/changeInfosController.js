import {hashPassword} from "../lib/utils.js";
import { query } from "../config/queries.js";

export async function updateProfilInfos(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur authentifié par le middleware authenticateToken
    let { username, password, name, email } = req.body; // Récupère les données du formulaire de mise à jour du profil

    const user = await query("SELECT * FROM db.users WHERE id = ?", [userId]); // Récupère les données de l'utilisateur authentifié

    if ((!username) && (!password) && (!name) && (!email)) { // Si aucun champ n'est rempli, renvoie une erreur
      return res.status(400).json({ error: "Aucun changement" });
    }
    else {
      if (username && username !== user[0].username) { // Si le nom d'utilisateur est différent de celui enregistré dans la base de données, met à jour le nom d'utilisateur
        await query("UPDATE db.Users SET username = ? WHERE id = ?", [username, userId]);
      }
      if (password && password.length > 7) { // Si le mot de passe est différent de celui enregistré dans la base de données, met à jour le mot de passe
        const hashedPassword = await hashPassword(password);
        if (hashedPassword === user[0].password) {
          return res.status(400).json({ error: "Le mot de passe n'a pas" +
                " changé" });
        }
        await query("UPDATE db.Users SET password = ? WHERE id = ?", [hashedPassword, userId]);
      }
      if (name && name !== user[0].name) { // Si le nom est différent de celui enregistré dans la base de données, met à jour le nom
        await query("UPDATE db.Users SET name = ? WHERE id = ?", [name, userId]);
      } 
      if (email && email !== user[0].email) { // Si l'email est différent de celui enregistré dans la base de données, met à jour l'email
        await query("UPDATE db.Users SET email = ? WHERE id = ?", [email, userId]);
      }
    }

    res.redirect('/settings')
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur dans la mise à jour du profil" });
  }
}
