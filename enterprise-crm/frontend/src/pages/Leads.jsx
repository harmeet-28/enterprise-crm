import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/leads/${id}`);

      alert("Lead Deleted Successfully");

      fetchLeads();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Lead");
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />

      <div className="leads-container">
        <h1>Lead Management</h1>

        <div className="lead-controls">
          <input
            type="text"
            placeholder="🔍 Search by Name, Email or Company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.company}</td>
                <td>{lead.status}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/edit-lead/${lead._id}`)
                    }
                  >
                    Edit
                  </button>

                  {role === "admin" && (
                    <button
                      className="delete-btn"
                      onClick={() => deleteLead(lead._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "15px",
            textAlign: "center",
            color: "#9ca3af",
          }}
        >
          Total Leads Found: {filteredLeads.length}
        </div>
      </div>
    </>
  );
}

export default Leads;