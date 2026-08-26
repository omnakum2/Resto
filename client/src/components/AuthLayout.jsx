import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const backgroundStyle = {
    backgroundColor: "rgba(63, 45, 24, 0.55)", // espresso-tinted overlay
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
