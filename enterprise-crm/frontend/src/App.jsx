import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";
import EditLead from "./pages/EditLead";
import Activities from "./pages/Activities";
import EmailLogs from "./pages/EmailLogs";
import ComposeEmail from "./pages/ComposeEmail";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/add-lead" element={<AddLead />} />
        <Route path="/edit-lead/:id" element={<EditLead />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/email-logs" element={<EmailLogs />} />
        <Route path="/compose-email" element={<ComposeEmail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
