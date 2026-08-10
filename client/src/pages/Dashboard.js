import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ ADD THIS
import "./Dashboard.css";

function Dashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2>Please login first ❌</h2>;
  }

  const user_id = user.id;

  // 👉 Add Contact
  const handleAddContact = async () => {
    if (!name || !phone) {
      toast.warning("Please fill all fields ⚠️");
      return;
    }

    const loading = toast.loading("Saving contact...");

    try {
      const res = await axios.post("http://localhost:5000/add-contact", {
        user_id,
        name,
        phone,
      });

      toast.update(loading, {
        render: res.data,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setName("");
      setPhone("");

    } catch (err) {
      console.error(err);

      toast.update(loading, {
        render: "Error adding contact ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // 👉 SOS
  const handleSOS = async () => {
    try {
      if (!navigator.geolocation) {
        toast.error("Geolocation not supported ❌");
        return;
      }

      const loading = toast.loading("Sending SOS...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

          // Save SOS
          await axios.post("http://localhost:5000/sos", {
            user_id,
            location: locationLink,
          });

          // Fetch contact
          const res = await axios.get(
            `http://localhost:5000/contact/${user_id}`
          );

          const contact = res.data;

          if (!contact) {
            toast.update(loading, {
              render: "No emergency contact found ⚠️",
              type: "warning",
              isLoading: false,
              autoClose: 2000,
            });
            return;
          }

          const message = `🚨 EMERGENCY ALERT 🚨
I need help immediately!
📍 Location: ${locationLink}`;

          window.open(
            `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`,
            "_blank"
          );

          toast.update(loading, {
            render: "SOS sent successfully 🚨",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        },
        () => {
          toast.update(loading, {
            render: "Location access failed ❌",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
      );

    } catch (err) {
      console.error(err);
      toast.error("SOS failed ❌");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* SOS */}
      <button className="sos-btn" onClick={handleSOS}>
        🚨 Trigger SOS
      </button>

      {/* Add Contact */}
      <div className="form-box">
        <h3>Add Emergency Contact</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone (e.g. 919876543210)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
}

export default Dashboard;