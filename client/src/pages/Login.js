import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/login", form);

    // ✅ store userId (temporary for now)
    localStorage.setItem("userId", 1);

    alert("Login successful ✅");

    navigate("/dashboard");

  } catch (err) {
    alert("Login failed ❌");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;