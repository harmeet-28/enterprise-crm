import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function EmailLogs() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const res = await API.get("/emails");
      setEmails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="email-page">
        <div className="email-header">
          <h1>Email Logs</h1>
          <p>View all emails sent from the CRM system.</p>
        </div>

        <div className="email-card">
          <table className="email-table">
            <thead>
              <tr>
                <th>#</th>
                <th>To</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>
              {emails.map((email, index) => (
                <tr key={email._id}>
                  <td>{index + 1}</td>
                  <td>{email.to}</td>
                  <td>{email.subject}</td>
                  <td>
                    <span className="status-badge">
                      {email.status}
                    </span>
                  </td>
                  <td>
                    {new Date(email.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {emails.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No email logs available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default EmailLogs;