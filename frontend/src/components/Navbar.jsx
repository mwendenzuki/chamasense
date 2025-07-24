import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional: pnpm add lucide-react for icons
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">ChamaSense</h1>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/loans">Loans</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/loans" onClick={toggleMenu}>
              Loans
            </Link>
          </li>
          <li>
            <Link to="/reports" onClick={toggleMenu}>
              Reports
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleMenu}>
              Settings
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
