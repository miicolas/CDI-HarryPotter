// queries.js
import pool from "./dbConfig.js";

const query = async (query, values) => { // query permet d'envoyer une requête à la base de données
  return new Promise((resolve, reject) => { // query renvoie une promesse qui sera résolue ou rejetée
    pool.getConnection((err, connection) => { // getConnection permet de récupérer une connexion à la base de données
      if (err) { // s'il y a une erreur, reject la promesse
        reject(err);
      } else { // sinon, on envoie la requête à la base de données
        connection.query(query, values, (err, rows) => { // query permet d'envoyer une requête à la base de données
          connection.release(); // on libère la connexion
          if (err) { // s'il y a une erreur, reject la promesse
            reject(err);
          } else {
            resolve(rows); // sinon, on résout la promesse avec les données de la requête
          }
        });
      }
    });
  });
};

export { query };
