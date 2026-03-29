const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const app = express();

// ✅ Middleware (must come before routes)
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("SafeGuard backend is running 🚀");
});

// ✅ Register API
const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send("Error");

    res.send("User registered securely ✅");
  });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) return res.status(500).send("Error");

    if (result.length === 0) {
      return res.status(401).send("User not found ❌");
    }

    const isMatch = await bcrypt.compare(password, result[0].password);

    if (isMatch) {
      res.send("Login successful ✅");
    } else {
      res.status(401).send("Invalid password ❌");
    }
  });
});

// ✅ SOS API (ADD HERE)
app.post("/sos", (req, res) => {
  const { userId, location } = req.body;

  // 1️⃣ Save SOS in database
  const insertQuery = "INSERT INTO sos_logs (user_id, location) VALUES (?, ?)";

  db.query(insertQuery, [userId, location], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving SOS");
    }

    // 2️⃣ Get user's emergency contacts
    const contactQuery = "SELECT * FROM contacts WHERE user_id = ?";

    db.query(contactQuery, [userId], (err, contacts) => {
      if (err) {
        return res.status(500).send("Error fetching contacts");
      }

      // 3️⃣ Simulate alert sending
      contacts.forEach((contact) => {
        console.log(`🚨 Alert sent to ${contact.name} (${contact.phone})`);
      });

      res.send("SOS triggered and alerts sent 🚨");
    });
  });
});

app.post("/add-contact", (req, res) => {
  const { user_id, name, phone } = req.body;

  const query = "INSERT INTO contacts (user_id, name, phone) VALUES (?, ?, ?)";

  db.query(query, [user_id, name, phone], (err) => {
    if (err) return res.status(500).send("Error");

    res.send("Contact added ✅");
  });
});



// ✅ Start server (always last)
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});