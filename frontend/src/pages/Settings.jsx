// src/pages/Settings.jsx
import { useState } from "react";
import "./Settings.module.css";

export default function Settings() {
  const [groupName, setGroupName] = useState("ChamaSense Elite");
  const [frequency, setFrequency] = useState("Monthly");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving settings:", { groupName, frequency });
    // Later: Send settings to backend here
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">Group Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contribution Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}
