import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const backgroundStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Deep blue to purple gradient
    height: "100vh", // Full viewport height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div>
      <div style={backgroundStyle}>
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card col-sm-8 col-md-6 col-lg-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
