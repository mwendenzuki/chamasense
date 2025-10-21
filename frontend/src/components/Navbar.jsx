import { Link, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "./api";
import "./Navbar.css";

export default function Navbar() {
  const token = getToken();
  const location = useLocation();
  const nav = useNavigate();
  const hideNavbar = ["/login", "/register", "/"].includes(location.pathname);

  if (hideNavbar) return null;

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const logout = () => {
    localStorage.removeItem("chama_token");
    nav("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home" className="navbar-logo">
          ChamaSense
        </Link>
      </div>

      {!isAuthPage && (
        <div className="navbar-links">
          <Link to="/home">Home</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/loans">Loans</Link>
          {token && <Link to="/members">Members</Link>}
          {token ? (
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
