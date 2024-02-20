import { query } from "../config/queries.js";

export async function checkExistingUserData(req, res, next) {
  try {
    const { username, email } = req.body;
    const userId = req.user.id;
    const user = await query("SELECT * FROM Users WHERE id = ?", [userId]);

    if (username && username !== user[0].username) {
      const confirmUsername = await query("SELECT * FROM Users WHERE username = ?", [username]);
      if (confirmUsername.length > 0 && username !== user[0].username) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }

    if (email && email !== user[0].email) {
      const confirmEmail = await query("SELECT * FROM Users WHERE email = ?", [email]);
      if (confirmEmail.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error checking existing user data" });
  }
}

export default checkExistingUserData;
