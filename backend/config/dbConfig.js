// dbConfig.js
import mysql from "mysql";


// const pool = mysql.createPool({ // Création d'un pool de connexion à la base de données 
//   host: "aws.connect.psdb.cloud",
//   user: "8rwmnujuyo67sxrtet0l",
//   password: "pscale_pw_IkTMmCgMJCjkw5iF2l0XFXlJDeSO6UjHWWS0OgsOiEn",
//   database: "db",
//   // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", 
// });

const pool = mysql.createPool('mysql://8rwmnujuyo67sxrtet0l:pscale_pw_IkTMmCgMJCjkw5iF2l0XFXlJDeSO6UjHWWS0OgsOiEn@aws.connect.psdb.cloud/db?ssl={"rejectUnauthorized":true}')

export default pool;
