import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await API.get("/activity");
      setActivities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="activity-page">
        <div className="activity-header">
          <h1>Activity Logs</h1>
          <p>Track all important actions performed in the CRM system.</p>
        </div>

        <div className="activity-card">
          <h2>📋 All Activities</h2>

          <table className="activity-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id}>
                  <td>{index + 1}</td>

                  <td>{activity.action}</td>

                  <td>{new Date(activity.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="activity-footer">
            Showing {activities.length} activities
          </div>
        </div>
      </div>
    </>
  );
}

export default Activities;
