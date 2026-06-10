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
    <div style={backgroundStyle}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
