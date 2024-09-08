import React, { useState } from "react";
import ResetPassword from "../auth/ResetPassword";
import QrCode from "../admin/QRCode"; // Assuming you have a QrCode component
import { Link } from "react-router-dom";

function Setting() {
  const [activeTab, setActiveTab] = useState("reset-password");
  const userType = localStorage.getItem("user_role");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          Settings
          <Link
            className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
            to={userType === "admin" ? "/admin" : "/staff"}
          >
            <span>Back</span>
          </Link>
        </div>
        <hr />
        <div className="border">
          <div className="m-3">
            <nav>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "reset-password" ? "active" : ""}`}
                    onClick={() => handleTabClick("reset-password")}
                  >
                    Reset Password
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "qr-code" ? "active" : ""}`}
                    onClick={() => handleTabClick("qr-code")}
                  >
                    QR Code
                  </button>
                </li>
              </ul>
            </nav>
            {activeTab === "reset-password" && <ResetPassword />}
            {activeTab === "qr-code" && <QrCode />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Setting;
