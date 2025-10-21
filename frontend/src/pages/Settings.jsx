import { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [formData, setFormData] = useState({
    groupName: "ChamaSense Elite",
    contributionFrequency: "monthly",
    notificationEmail: "admin@chamasense.com",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, we'd send this to a backend endpoint (e.g., /update_settings)
    console.log("Settings saved:", formData);
    setMessage("✅ Settings updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="settings-page">
      <h1>Group Settings</h1>
      <p className="subtitle">Manage your chama’s preferences and details.</p>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="groupName">Group Name</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contributionFrequency">Contribution Frequency</label>
          <select
            id="contributionFrequency"
            name="contributionFrequency"
            value={formData.contributionFrequency}
            onChange={handleChange}
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notificationEmail">Notification Email</label>
          <input
            type="email"
            id="notificationEmail"
            name="notificationEmail"
            value={formData.notificationEmail}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>

      {message && <p className="success-msg">{message}</p>}
    </div>
  );
}
