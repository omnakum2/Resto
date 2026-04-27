import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Verify OTP, Step 3: Change Password
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setError("");
        setStep(2); // Move to OTP verification step
      } else {
        setError(result.message || "Server error");
        setMessage("");
      }
    } catch (err) {
      console.error("Error in forgot-password:", err);
      setError("Server error");
      setMessage("");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    try {
      const response = await fetch(`${URL}user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setError("");
        navigate("/login"); // Optionally, redirect to login or other page
      } else {
        setError(result.message || "Server error");
        setMessage("");
      }
    } catch (err) {
      console.error("Error in change-password:", err);
      setError("Server error");
      setMessage("");
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <h2 className="card-title text-center">Forgot Password</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <form onSubmit={handleEmailSubmit} className="m-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send OTP
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="card-title text-center">Verify OTP</h2>
          <form onSubmit={handleOtpSubmit} className="m-4">
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                OTP:
              </label>
              <input
                type="text"
                id="otp"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {passwordError && (
              <p className="text-danger text-center mb-3">{passwordError}</p>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Change Password
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
