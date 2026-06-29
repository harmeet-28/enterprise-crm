import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      navigate("/");
    }
  };

  return (
    <nav className="sidebar">

      <h2 className="logo">Enterprise CRM</h2>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/leads"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Leads
      </NavLink>

      <NavLink
        to="/add-lead"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Add Lead
      </NavLink>

      <NavLink
        to="/compose-email"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Compose Email
      </NavLink>

      {role === "admin" && (
        <>
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Activities
          </NavLink>

          <NavLink
            to="/email-logs"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Email Logs
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Users
          </NavLink>
        </>
      )}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;