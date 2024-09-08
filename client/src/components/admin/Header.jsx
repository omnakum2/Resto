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
    window.location.href = "/auth"; // Redirect to login page after logout
  };

  return (
    <div>
      {/* ======= Header ======= */}
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ background: "#36454f" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/admin">
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
          <Link
            to="/admin/profile"
            className="text-decoration-none"
            style={{ color: "#36454f" }}
          >
            <div className="box text-center">
              <div className="row">
                <span className="bi bi-person-fill display-6"></span>
              </div>
              <div className="row mb-2">
                <strong>
                  <span className="h4">{userName}</span>
                </strong>
              </div>
            </div>
          </Link>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin">
              <i className="bi bi-grid-fill"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/category">
              <i className="bi bi-stack"></i>
              <span>New Category</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/table">
              <i className="bi bi-table"></i>
              <span>New Table</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/food">
              <i className="bi bi-box"></i>
              <span>New Food</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/staff">
              <i className="bi bi-people-fill"></i>
              <span>Staff</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/reports">
              <i className="bi bi-bar-chart-fill"></i>
              <span>Reports</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/orders">
              <i className="bi bi-list-check"></i>
              <span>Orders</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/settings">
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
