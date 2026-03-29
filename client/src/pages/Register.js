import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", form);

      alert("Registered successfully ✅");
      navigate("/");

    } catch (err) {
      alert("Registration failed ❌");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Enter Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;