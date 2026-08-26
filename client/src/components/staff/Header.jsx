import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
    document.body.classList.toggle("toggle-sidebar", !isSidebarOpen);
  };

  const userName = localStorage.getItem("user_name");
  const userRole = localStorage.getItem("user_role");
  const initial = userName ? userName.trim().charAt(0) : "?";

  const navClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : " collapsed");

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
        style={{ background: "var(--admin-espresso)" }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold"
            to="/staff"
            style={{ color: "var(--admin-brand)" }}
          >
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
            <span style={{ color: "var(--admin-brand)" }}>
              <i className="bi bi-list"></i>
            </span>
          </button>
        </div>
      </nav>

      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink className={navClass} to="/staff" end>
              {({ isActive }) => (
                <>
                  <i className={`bi bi-grid${isActive ? "-fill" : ""}`}></i>
                  <span>Dashboard</span>
                </>
              )}
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={navClass} to="/staff/menu">
              {({ isActive }) => (
                <>
                  <i
                    className={`bi bi-menu-button-wide${isActive ? "-fill" : ""}`}
                  ></i>
                  <span>Menu</span>
                </>
              )}
            </NavLink>
          </li>

          <li className="nav-item">
            <a
              href="."
              className="nav-link collapsed"
              data-bs-target="#stock-nav"
              data-bs-toggle="collapse"
            >
              <i className="bi bi-receipt"></i>
              <span>Orders</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="stock-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <NavLink to="/staff/new-order">
                  <i className="bi bi-circle"></i>
                  <span>New Order</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/staff/orders">
                  <i className="bi bi-circle"></i>
                  <span>Manage Order</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className={navClass} to="/staff/settings">
              {({ isActive }) => (
                <>
                  <i className={`bi bi-gear${isActive ? "-fill" : ""}`}></i>
                  <span>Settings</span>
                </>
              )}
            </NavLink>
          </li>

          {/* Profile + Logout pinned to bottom */}
          <li className="sidebar-profile">
            <Link to="/staff/profile" className="avatar" title="View profile">
              {initial}
            </Link>
            <Link
              to="/staff/profile"
              className="profile-info text-decoration-none"
            >
              <span className="profile-name">{userName}</span>
              <span className="profile-role">{userRole}</span>
            </Link>
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </li>
        </ul>
      </aside>
      {/* End Sidebar */}
    </div>
  );
}

export default Header;
