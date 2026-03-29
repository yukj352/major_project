import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>🛡️ SafeGuard</h2>
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      {/* HERO SECTION */}
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

      {/* SOS SECTION */}
      <section className="sos-section">
        <h2>In Trouble? Click SOS</h2>
        <button className="sos-btn">🚨 SOS Emergency</button>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About SafeGuard</h2>
        <p>
          SafeGuard is an AI-powered safety platform that helps users send
          emergency alerts with location tracking and smart chatbot support.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 SafeGuard | All rights reserved</p>
      </footer>

    </div>
  );
}

export default Landing;