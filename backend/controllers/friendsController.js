import { query } from "../config/queries.js";

export async function addFriend(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    const { friend } = req.body; // Récupère le nom de l'ami à ajouter

    if (userId === friend) {
      // Si l'ami est l'utilisateur lui-même, renvoie une erreur
      return res
        .status(400)
        .json({ error: "Vous ne pouvez pas vous ajouter en ami" });
    }

    const friendId = await query("SELECT id from Users WHERE username = ?", [
      friend,
    ]);

    if (friendId.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    const friendIdValue = friendId[0].id;

    const friendExist = await query(
      "SELECT * from Friends WHERE userID1 = ? AND userID2 = ?",
      [userId, friendIdValue]
    );

    if (friendExist.length > 0) {
      // Si l'ami existe déjà, renvoie une erreur
      return res.status(400).json({ error: "L'ami existe déjà" });
    }

    await query("INSERT INTO Friends (userID1, userID2) VALUES (?, ?)", [
      userId,
      friendIdValue,
    ]);

    res.status(200).redirect("/friends");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'ami" });
  }
}

export async function getFriends(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    const usernamefriendsPending = await query(
      "SELECT DISTINCT username FROM Users JOIN Friends ON Users.id = Friends.userID1 WHERE Friends.userID2 = ? AND Friends.statut = 'pending'",
      [userId]
    );

    console.log(usernamefriendsPending);

    const usernamefriends = await query(
      "SELECT DISTINCT username FROM Users JOIN Friends ON Users.id = CASE WHEN Friends.userID1 = ? THEN Friends.userID2 ELSE Friends.userID1 END WHERE (Friends.userID1 = ? OR Friends.userID2 = ?) AND Friends.statut = 'accepted'",
      [userId, userId, userId]
    );
    // username selectionne le nom de l'utilisateur dans la table Users et Friends.userID1 = ? et Friends.userID2 = ? selectionne les amis de l'utilisateur connecté et Friends.statut = 'accepted' selectionne les amis acceptés

    console.log(usernamefriends);

    res.status(200).json({
      usernamefriendsPending: usernamefriendsPending,
      usernamefriends: usernamefriends,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des amis" });
  }
}

export async function acceptFriend(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token

    const friend = req.query.friend; // Récupère le nom de l'ami à accepter depuis la requête GET


    const friendID = await query("SELECT id from Users WHERE username = ?", [
      friend,
    ]);

    if (friendID.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    const friendIdValue = friendID[0].id;

    const friendExist = await query(
      "SELECT * from Friends WHERE userID1 = ? AND userID2 = ?",
      [friendIdValue, userId]
    );

    if (friendExist.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    await query(
      "UPDATE Friends SET statut = 'accepted' WHERE userID1 = ? AND userID2 = ?",
      [friendIdValue, userId]
    );

    res.status(200).redirect("/friends");
  } catch (error) {
    error.status(500).json({ error: "Erreur lors de l'acceptation de l'ami" });
  }
}

export async function deleteFriend(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    const friend = req.query.friend; // Récupère le nom de l'ami à supprimer depuis la requête GET

    const friendID = await query("SELECT id from Users WHERE username = ?", [
      friend,
    ]);

    if (friendID.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    const friendIdValue = friendID[0].id;

    const friendExist = await query(
      "SELECT * from Friends WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)",
      [friendIdValue, userId, userId, friendIdValue]
    );

    if (friendExist.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    await query("DELETE FROM Friends WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)", [friendIdValue, userId, userId, friendIdValue]);

    res.status(200).redirect("/friends");
  } catch (error) {
    error.status(500).json({ error: "Erreur lors de la suppression de l'ami" });
  }
}
