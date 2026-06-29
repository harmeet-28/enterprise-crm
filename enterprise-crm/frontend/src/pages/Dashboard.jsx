import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [leads, setLeads] = useState([]);

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

  const qualified = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const wonDeals = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const lostDeals = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Enterprise CRM Dashboard</h1>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Welcome to your CRM Management System
        </p>

        <div className="cards">
          <div className="card">
            <h3>Total Leads</h3>
            <h2>{leads.length}</h2>
          </div>

          <div className="card">
            <h3>Qualified Leads</h3>
            <h2>{qualified}</h2>
          </div>

          <div className="card">
            <h3>New Leads</h3>
            <h2>{newLeads}</h2>
          </div>

          <div className="card">
            <h3>Won Deals</h3>
            <h2>{wonDeals}</h2>
          </div>

          <div className="card">
            <h3>Lost Deals</h3>
            <h2>{lostDeals}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;