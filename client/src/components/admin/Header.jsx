import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/admin", end: true, icon: "grid", label: "Dashboard" },
  { to: "/admin/category", icon: "collection", label: "New Category" },
  { to: "/admin/table", icon: "grid-3x3-gap", label: "New Table" },
  { to: "/admin/food", icon: "basket", label: "New Food" },
  { to: "/admin/staff", icon: "people", label: "New Staff" },
  { to: "/admin/reports", icon: "bar-chart", label: "Reports" },
  { to: "/admin/settings", icon: "gear", label: "Settings" },
];

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
    document.body.classList.toggle("toggle-sidebar", !isSidebarOpen);
  };

  const userName = localStorage.getItem("user_name");
  const userRole = localStorage.getItem("user_role");
  const initial = userName ? userName.trim().charAt(0) : "?";

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
            to="/admin"
            style={{ color: "var(--admin-brand)" }}
          >
            Resto
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
          {NAV_ITEMS.map((item) => (
            <li className="nav-item" key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : " collapsed")
                }
              >
                {({ isActive }) => (
                  <>
                    <i
                      className={`bi bi-${item.icon}${isActive ? "-fill" : ""}`}
                    ></i>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}

          {/* Profile + Logout pinned to bottom */}
          <li className="sidebar-profile">
            <Link to="/admin/profile" className="avatar" title="View profile">
              {initial}
            </Link>
            <Link
              to="/admin/profile"
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
