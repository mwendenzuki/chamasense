import { useState } from "react";
import { loginUser } from "../components/api";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    if (res.access_token) {
      nav("/members");
    } else {
      setError(res.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>

      <form onSubmit={onSubmit} className="login-form">
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="login-btn">
          Login
        </button>

        {error && <p className="login-error">{error}</p>}
      </form>

      <div className="login-footer">
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="back-home">
          <Link to="/" className="back-link">
            ← Back to Landing Page
          </Link>
        </p>
      </div>
    </div>
  );
}
