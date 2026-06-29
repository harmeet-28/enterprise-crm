import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <h2>Enterprise CRM Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
