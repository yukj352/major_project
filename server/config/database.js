const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "safeguard_user",
  password: "1234",
  database: "safeguard"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ❌", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

module.exports = db;