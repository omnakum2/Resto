import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
    document.body.classList.toggle("toggle-sidebar", !isSidebarOpen);
  };

  const userName = localStorage.getItem("user_name");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_token");
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <div>
      {/* ======= Header ======= */}
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ background: "#36454f" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/staff">
            FoodCourt
          </Link>
          <button
            className="navbar-toggler toggle-sidebar-btn"
            type="button"
            onClick={handleToggle}
            aria-controls="navbarNav"
            aria-expanded={isSidebarOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="text-light">
              <i className="bi bi-list"></i>
            </span>
          </button>
        </div>
      </nav>

      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/staff">
              <i className="bi bi-grid-fill"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/staff/menu">
              <i className="bi bi-list-task"></i>
              <span>Menu</span>
            </Link>
          </li>

          <li className="nav-item">
            <a
              href="."
              className="nav-link collapsed"
              data-bs-target="#stock-nav"
              data-bs-toggle="collapse"
            >
              <i className="bi bi-plus-lg"></i>
              <span>Orders</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="stock-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/staff/new-order">
                  <i className="bi bi-circle"></i>
                  <span>New Order</span>
                </Link>
              </li>
              <li>
                <Link to="/staff/orders">
                  <i className="bi bi-circle"></i>
                  <span>Manage Order</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/staff/settings">
              <i className="bi bi-gear-fill"></i>
              <span>Settings</span>
            </Link>
          </li>

          <li className="nav-item">
            <p className="nav-link collapsed" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </p>
          </li>

          <li className="nav-item adminfooter">
            <p className="nav-link collapsed">
              &copy;{" "}
              <strong>
                <span>FoodCourt</span>
              </strong>
              . All Rights Reserved
            </p>
          </li>
        </ul>
      </aside>
      {/* End Sidebar */}
    </div>
  );
}

export default Header;
