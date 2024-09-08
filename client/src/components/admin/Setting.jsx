import React from "react";
import ResetPassword from "../auth/ResetPassword";
import { Link } from "react-router-dom";

function Setting() {
  const userType = localStorage.getItem("user_role");
  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          Reset Password
          <Link
            className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
            to={userType === "admin" ? "/admin" : "/staff"}
          >
            <span>Back</span>
          </Link>
        </div>
        <hr />

        <ResetPassword />
      </main>
    </div>
  );
}

export default Setting;
