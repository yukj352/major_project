import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      {/* 🔔 Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      <BrowserRouter>
        <Routes>

          {/* 🏠 Landing page */}
          <Route path="/" element={<Landing />} />

          {/* 🔐 Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 📊 Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;