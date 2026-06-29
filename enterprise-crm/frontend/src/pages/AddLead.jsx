import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AddLead() {
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/leads", lead);

      alert("Lead Added Successfully");

      navigate("/leads");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Lead");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h1>Add New Lead</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={lead.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={lead.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={lead.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Enter Company"
            value={lead.company}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={lead.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          <button type="submit">
            Add Lead
          </button>
        </form>
      </div>
    </>
  );
}

export default AddLead;