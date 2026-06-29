import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users", user);

      alert("User Created Successfully");

      navigate("/users");
    } catch (error) {
      console.log(error);
      alert("Failed to Create User");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h1>Add New User</h1>

        <form onSubmit={handleSubmit} className="user-form">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
          </select>

          <button type="submit">
            Create User
          </button>

        </form>
      </div>
    </>
  );
}

export default AddUser;