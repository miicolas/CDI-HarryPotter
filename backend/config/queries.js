// queries.js
import pool from "./dbConfig.js";

const query = async (query, values) => { // async function
  return new Promise((resolve, reject) => { // returns a promise
    pool.getConnection((err, connection) => { // gets a connection from the pool
      if (err) { // if there's an error, reject the promise
        reject(err);
      } else { // if there's no error, run the query
        connection.query(query, values, (err, rows) => {
          connection.release(); // release the connection back to the pool
          if (err) { // if there's an error, reject the promise
            reject(err);
          } else {
            resolve(rows); // if there's no error, resolve the promise
          }
        });
      }
    });
  });
};

export { query };
