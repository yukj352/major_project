import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import Chatbot from "../components/Chatbot"; // ✅ IMPORTANT
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showChat, setShowChat] = useState(false); // ✅ state

  // 🚨 SOS FUNCTION
  const handleSOS = async () => {
    if (!user) {
      toast.warning("Please login first ⚠️");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    try {
      if (!navigator.geolocation) {
        toast.error("Geolocation not supported ❌");
        return;
      }

      const loadingToast = toast.loading("Sending SOS...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

          await axios.post("http://localhost:5000/sos", {
            user_id: user.id,
            location: locationLink,
          });

          const res = await axios.get(
            `http://localhost:5000/contact/${user.id}`
          );

          const contact = res.data;

          if (!contact) {
            toast.update(loadingToast, {
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

          toast.update(loadingToast, {
            render: "SOS triggered successfully 🚨",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        },
        () => {
          toast.update(loadingToast, {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully 👋");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <h2>🛡️ SafeGuard</h2>

        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-content">
          <h1>SafeGuard</h1>
          <p>Your Safety, One Click Away</p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/login")} className="btn-primary">
              Login
            </button>
            <button onClick={() => navigate("/register")} className="btn-secondary">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features">
        <h2>Our Features</h2>

        <div className="feature-grid">
          <div className="card">🚨 SOS Alerts</div>
          <div className="card">📩 Contact Notification</div>
          <div className="card">🤖 AI Chatbot</div>
          <div className="card">📍 Location Sharing</div>
        </div>
      </section>

      {/* SOS */}
      <section className="sos-section">
        <h2>In Trouble? Click SOS</h2>

        <button className="sos-btn" onClick={handleSOS}>
          🚨 SOS Emergency
        </button>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About SafeGuard</h2>
        <p>
          SafeGuard is an AI-powered safety platform that helps users send
          emergency alerts with location tracking and smart chatbot support.
        </p>
      </section>

      {/* ✅ FLOATING CHATBOT BUTTON */}
      <button
        onClick={() => setShowChat(!showChat)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "15px 18px",
          borderRadius: "50%",
          background: "#ff4d4d",
          color: "white",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 0 15px rgba(255,0,0,0.6)",
        }}
      >
        💬
      </button>

      {/* ✅ CHATBOX UI */}
      {showChat && <Chatbot />}

      {/* FOOTER */}
      <footer>
        <p>© 2026 SafeGuard | All rights reserved</p>
      </footer>
    </div>
  );
}

export default Landing;