import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const userId = localStorage.getItem("userId") || 1; // temp fallback

  // 👉 Add Contact
  const handleAddContact = async () => {
    try {
      await axios.post("http://localhost:5000/add-contact", {
        user_id: userId,
        name,
        phone,
      });

      alert("Contact added ✅");
      setName("");
      setPhone("");

    } catch (err) {
      alert("Error adding contact ❌");
    }
  };

  // 👉 SOS
  const handleSOS = async () => {
    try {
      await axios.post("http://localhost:5000/sos", {
        userId,
        location,
      });

      alert("SOS sent 🚨");

    } catch (err) {
      alert("SOS failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* 🔴 SOS Button */}
      <button
        onClick={handleSOS}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "15px",
          fontSize: "18px",
          border: "none",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        🚨 Trigger SOS
      </button>

      <br /><br />

      {/* 📍 Location Input */}
      <input
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <br /><br />

      {/* 📞 Add Contact */}
      <h3>Add Emergency Contact</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAddContact}>
        Add Contact
      </button>
    </div>
  );
}

export default Dashboard;