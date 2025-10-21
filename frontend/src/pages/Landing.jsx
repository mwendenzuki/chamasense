/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div
        className="landing-bg"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3894383/pexels-photo-3894383.jpeg')",
        }}
      ></div>
      <div className="landing-overlay"></div>

      <header className="landing-header">
        <h1>ChamaSense</h1>
        <div className="landing-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>
      </header>

      <main className="landing-main">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Empowering Chamas through Smart Financial Insights
        </motion.h2>

        <p>
          ChamaSense helps groups manage their savings, track loans, and
          forecast financial growth — all with data-driven insights and a
          community-focused design.
        </p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link to="/register" className="start-btn">
            Get Started
          </Link>
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </motion.div>
      </main>

      <section className="landing-stats">
        {[
          { number: "2.4K+", label: "Active Chamas" },
          { number: "18M+", label: "Savings Managed" },
          { number: "92%", label: "Loan Repayment Rate" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2 }}
          >
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <footer className="landing-footer">
        <p>Empowering communities, one chama at a time</p>
        <p>&copy; 2025 ChamaSense. All rights reserved.</p>
      </footer>
    </div>
  );
}
