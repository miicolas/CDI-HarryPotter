// const express = require("express");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const path = require("path");

// const port = process.env.PORT || 3000;

// const app = express();

// // Create a pool
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "nodejs",
//   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
// });

// // Middleware to parse incoming request bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));

// });

// app.post("/add", async (req, res) => {
//   try {
//     const query = async (query, values) => {
//       return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//           if (err) {
//             reject(err);
//           } else {
//             connection.query(query, values, (err, rows) => {
//               connection.release();
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(rows);
//               }
//             });
//           }
//         });
//       });
//     };
//     console.log('check1');
//     const username = req.body.username;
//     const password = req.body.password;
//     const confirmUsername = await query(
//       "SELECT username FROM account WHERE username = ?",
//       [username]
//     );
//     if (!(username.length > 0) || !(password.length > 8)) {
//       if (!(password.length > 8)) {
//         return res.status(400).json({ error: "Password must be at least 8 characters" });
//       }
//       return res.status(400).json({ error: "Invalid username" });
//     }
//     if (confirmUsername.length > 0) {
//       return res.status(400).json({ error: "Username already exists" });
//     }
//     console.log('check2');
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it
//     console.log('check3');
//     const result = await query(
//       "INSERT INTO account (username, password) VALUES  (?, ?)",
//       [username, hashedPassword] // Store the hashed password in the database
//     );
//     res.redirect("/");
//     console.log('checkFinal');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error adding data" });
//   }
// });

// app.get("/login", async (req, res) => {
//   try {
//     const query = async (query, values) => {
//       return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//           if (err) {
//             reject(err);
//           } else {
//             connection.query(query, values, (err, rows) => {
//               connection.release();
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(rows);
//               }
//             });
//           }
//         });
//       });
//     };
//     const username = req.body.username;
//     const password = req.body.password;
//     const result = await query(
//       "SELECT * FROM account WHERE username = ?",
//       [username]
//     );
//     if (result.length === 0) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }
//     const hashedPassword = result[0].password;
//     const validPassword = await bcrypt.compare(password, hashedPassword);
//     if (!validPassword) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }
//     console.log("Successfully logged in");
//     res.redirect("/");
//   }
//   catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error logging in" });
//   }
// }
// );

// app.listen(port, () => console.log(`Listening on port ${port}`));


// app.js
const express = require("express");
const app = express();
const signupRoute = require("../routes/signup");
const loginRoute = require("../routes/login");
// const usernamesRoute = require("../routes/usernames");
const path = require("path");

const port = process.env.PORT || 3000; 
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
    
  res.sendFile(path.join(__dirname, "../public/")); // Send the index.html file
});

app.use("/", signupRoute); // Use the addRoute middleware
app.use("/", loginRoute);  // Use the loginRoute middleware
// app.use("/", usernamesRoute); // Use the usernamesRoute middleware

app.listen(port, () => console.log(`Listening on port ${port}`));
