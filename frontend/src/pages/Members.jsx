import { useEffect, useState } from "react";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../components/api";
import "./Members.css";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    contribution: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---- Load Members ----
  async function load() {
    try {
      setLoading(true);
      const data = await getMembers();
      setMembers(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // ---- Submit (Add or Update) ----
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await updateMember(editId, form);
      } else {
        await addMember(form);
      }
      setForm({ name: "", phone: "", contribution: "" });
      setEditId(null);
      await load();
    } catch {
      setError("Error saving member.");
    }
  }

  // ---- Edit ----
  function handleEdit(member) {
    setForm({
      name: member.name,
      phone: member.phone,
      contribution: member.contribution,
    });
    setEditId(member.id);
  }

  // ---- Delete ----
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await deleteMember(id);
      await load();
    } catch {
      setError("Error deleting member.");
    }
  }

  if (loading) return <p className="loading">Loading members...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="members-container">
      <h2 className="members-title">Members Dashboard</h2>

      <form className="member-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Member Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Contribution (KES)"
          value={form.contribution}
          onChange={(e) => setForm({ ...form, contribution: e.target.value })}
          required
        />
        <button type="submit" className="btn-submit">
          {editId ? "Update Member" : "Add Member"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", phone: "", contribution: "" });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Contribution (KES)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>{m.contribution}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(m)}>
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(m.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="empty">
                No members added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
