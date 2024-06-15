import React from "react";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";
import { getCookie } from "../utils";
import { useLocation } from "react-router-dom";
import { logoutService } from "../services/userService";

function AdminNavBar() {
  const token = getCookie("jwtToken");
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();

    logoutService(token);
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
              href="/admin"
              className={
                location.pathname === "/admin" ||
                location.pathname === "/admin/addCourse" ||
                location.pathname === "/admin/editCourse"
                  ? "active-link"
                  : ""
              }
            >
              Courses
            </a>
          </li>
          <li>
            <a
              href="/admin/viewStudents"
              className={
                location.pathname === "/admin/viewStudents" ||
                location.pathname === "/admin/addStudent" ||
                location.pathname === "/admin/editStudent"
                  ? "active-link"
                  : ""
              }
            >
              Students
            </a>
          </li>
          <li>
            <a
              href="/admin/viewEnroll"
              className={
                location.pathname === "/admin/viewEnroll" ||
                location.pathname === "/admin/addEnrollment" ||
                location.pathname === "/admin/editEnroll"
                  ? "active-link"
                  : ""
              }
            >
              Enroll
            </a>
          </li>
          <li>
            <a
              href="#profile"
              onClick={handleLogout}
              className={location.hash === "#" ? "active-link" : ""}
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNavBar;
