import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";
import { getCookie } from "../utils";
import { logoutService } from "../services/userService";

function NavBar() {
  const token = getCookie("jwtToken");
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutService(token);
  };

  return (
    <div>
      <nav className="d-flex navbar">
        <div className="d-flex navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <ul className="d-flex p-1 m-3 gap-4 navbar-links">
          <li>
            <a
              href="/student"
              className={location.pathname === '/student' ? 'active-link' : ''}
            >
              Courses
            </a>
          </li>
          <li>
            <a
              href="/student/course"
              className={location.pathname === '/student/course' ? 'active-link' : ''}
            >
              My Courses
            </a>
          </li>
          <li>
            <a
              href="#profile"
              onClick={handleLogout}
              className={location.hash === '#profile' ? 'active-link' : ''}
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
