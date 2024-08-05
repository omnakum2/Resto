import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #87CEEB, #2F4F4F)', // Deep blue to purple gradient
      height: '100vh', // Full viewport height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  };
  
  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // White with 50% opacity
  };

  return (
    <div style={backgroundStyle}>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="card col-sm-4 col-md-4" style={cardStyle}>
            <div className="card-title">
              <div className="text-center mt-4">
                <h2 className="text-center mb-4">
                  <i className="fa fa-utensils text-primary"></i>&nbsp; New User
                </h2>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={"handleSubmit"}>
                {/* {error && (
                  <div className="mt-3 alert alert-danger">{error}</div>
                )}
                {success && (
                  <div className="mt-3 alert alert-success">{success}</div>
                )} */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-control"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="form-control"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login" className="link-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
