import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";
import { getCookie } from "../utils";
import logoutService from "../services/logoutService";

function NavBar() {
  const token = getCookie("jwtToken");

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
        <ul className=" d-flex p-1 m-3 gap-4 navbar-links">
          <li>
            <a href="#home">Courses</a>
          </li>
          <li>
            <a href="#courses">My Courses</a>
          </li>
          <li>
            <a href="#profile" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
