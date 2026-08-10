const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const bcrypt = require("bcrypt");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("SafeGuard backend is running 🚀");
});


// ===================== 🔐 REGISTER =====================
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(query, [name, email, hashedPassword], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error registering user ❌");
      }

      res.send("User registered securely ✅");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error ❌");
  }
});


// ===================== 🔐 LOGIN =====================
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
      res.send({
        message: "Login successful ✅",
        user: result[0],
      });
    } else {
      res.status(401).send("Invalid password ❌");
    }
  });
});


// ===================== 📇 ADD CONTACT (ONLY ONE) =====================
app.post("/add-contact", (req, res) => {
  const { user_id, name, phone } = req.body;

  if (!user_id || !name || !phone) {
    return res.status(400).send("Missing fields ❌");
  }

  // 🔍 Check if user already has a contact
  const checkQuery = "SELECT * FROM contacts WHERE user_id = ?";

  db.query(checkQuery, [user_id], (err, result) => {
    if (err) return res.status(500).send("Error checking contact ❌");

    if (result.length > 0) {
      return res.send("Primary contact already exists ❌");
    }

    const insertQuery =
      "INSERT INTO contacts (user_id, name, phone) VALUES (?, ?, ?)";

    db.query(insertQuery, [user_id, name, phone], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error adding contact ❌");
      }

      res.send("Primary contact added ✅");
    });
  });
});


// ===================== 📞 GET PRIMARY CONTACT =====================
app.get("/contact/:user_id", (req, res) => {
  const { user_id } = req.params;

  const query = "SELECT * FROM contacts WHERE user_id = ? LIMIT 1";

  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).send("Error");

    res.json(result[0]); // return single contact
  });
});


// ===================== 🚨 SOS =====================
app.post("/sos", (req, res) => {
  const { user_id, location } = req.body;

  console.log("🚨 SOS triggered by user:", user_id);
  console.log("📍 Location:", location);

  if (!user_id || !location) {
    return res.status(400).send("Missing SOS data ❌");
  }

  // 1️⃣ Save SOS
  const insertQuery = "INSERT INTO sos_logs (user_id, location) VALUES (?, ?)";

  db.query(insertQuery, [user_id, location], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving SOS ❌");
    }

    // 2️⃣ Fetch user's primary contact
    const contactQuery = "SELECT * FROM contacts WHERE user_id = ? LIMIT 1";

    db.query(contactQuery, [user_id], (err, contacts) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error fetching contact ❌");
      }

      console.log("📞 Contact fetched:", contacts);

      if (contacts.length === 0) {
        return res.send("No contact found ⚠️");
      }

      const contact = contacts[0];

      console.log(`🚨 Alert will be sent to ${contact.name} (${contact.phone})`);

      res.send("SOS triggered successfully 🚨");
    });
  });
});


// ===================== 🚀 START SERVER =====================
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});