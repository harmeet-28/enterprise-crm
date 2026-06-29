import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ComposeEmail() {
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/emails", email);

      alert("Email saved successfully!");

      setEmail({
        to: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to save email.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="compose-page">
        <h1>Compose Email</h1>

        <form className="compose-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="to"
            placeholder="Recipient Email"
            value={email.to}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={email.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            rows="8"
            placeholder="Write your message..."
            value={email.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Save Email
          </button>
        </form>
      </div>
    </>
  );
}

export default ComposeEmail;