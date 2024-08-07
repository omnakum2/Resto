import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
    document.body.classList.toggle("toggle-sidebar", !isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage or cookies
    localStorage.removeItem("userId");
    localStorage.removeItem("token"); // If you store the JWT token separately

    // Optionally, clear any other related data or state

    // Redirect to login or home page
    navigate("/login");
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
                  <span className="h4">{"user?.name"}</span>
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
            <a
              href="."
              className="nav-link collapsed"
              data-bs-target="#stock-nav"
              data-bs-toggle="collapse"
            >
              <i className="bi bi-bar-chart-fill"></i>
              <span>Reports</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="stock-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/admin/stock/add">
                  <i className="bi bi-circle"></i>
                  <span>Admin</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/stock">
                  <i className="bi bi-circle"></i>
                  <span>In/Out</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/stock">
                  <i className="bi bi-circle"></i>
                  <span>Most Sell</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/staff">
              <i className="bi bi-people-fill"></i>
              <span>Staff</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link className="nav-link collapsed" to="/admin/newadmin">
              <i className="bi bi-people-fill"></i>
              <span>New Admin</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <p className="nav-link collapsed" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </p>
          </li>
        </ul>
      </aside>
      {/* End Sidebar */}

      {/* ======= Footer ======= */}
      <footer id="footer" className="footer fixed-bottom">
        <div className="copyright">
          &copy;{" "}
          <strong>
            <span>FoodCourt</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>
      {/* End Footer */}
    </div>
  );
}

export default Header;
