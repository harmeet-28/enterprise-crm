import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await API.put(`/users/${id}`, { role });

      alert("Role Updated Successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to Update Role");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete User");
    }
  };

  return (
    <>
      <Navbar />

      <div className="users-page">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h1>User Management</h1>

          <button
            className="add-btn"
            onClick={() => navigate("/add-user")}
          >
            + Add User
          </button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        updateRole(
                          user._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="admin">
                        Admin
                      </option>

                      <option value="sales">
                        Sales
                      </option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "25px",
                  }}
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;