import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "",
  });

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const res = await API.get("/leads");

      const selectedLead = res.data.find(
        (lead) => lead._id === id
      );

      if (selectedLead) {
        setLead(selectedLead);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/leads/${id}`, lead);

      alert("Lead Updated Successfully");

      navigate("/leads");
    } catch (error) {
      console.log(error);
      alert("Failed to Update Lead");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h1>Edit Lead</h1>

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
            Update Lead
          </button>
        </form>
      </div>
    </>
  );
}

export default EditLead;