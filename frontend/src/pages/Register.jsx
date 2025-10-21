import { useState } from "react";
import { registerUser } from "../components/api";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    group_name: "",
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsError(false);

    try {
      const res = await registerUser(form);

      if (res.msg === "user created") {
        setMsg("✅ Registration successful! Redirecting to login...");
        setTimeout(() => nav("/login"), 1500);
      } else {
        setMsg(res.msg || "❌ Something went wrong. Try again.");
        setIsError(true);
      }
    } catch {
      setMsg(
        "⚠️ Registration failed. Username or email already exists. Please try again."
      );
      setIsError(true);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Your Account</h2>

      <form onSubmit={onSubmit} className="register-form">
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Chama / Group Name"
          value={form.group_name}
          onChange={(e) => setForm({ ...form, group_name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      {msg && (
        <p className={`register-msg ${isError ? "error" : "success"}`}>{msg}</p>
      )}

      <div className="register-footer">
        <Link to="/" className="back-btn">
          ← Back to Landing Page
        </Link>
      </div>
    </div>
  );
}
