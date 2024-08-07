import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_as: "staff",
    status: "deactive",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/register",
        formData
      );
      if (response.status === 200) {
        setSuccess("Registration Successful");
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("Server error...");
      }
    }
  };

  const backgroundStyle = {
    background: "linear-gradient(135deg, #87CEEB, #2F4F4F)", // Deep blue to purple gradient
    height: "100vh", // Full viewport height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={backgroundStyle}>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="card col-sm-8 col-md-6 col-lg-4">
            <div className="card-title">
              <div className="text-center mt-4">
                <h2 className="text-center mb-4">
                  <i className="fa fa-utensils admintext-primary"></i>&nbsp; New
                  User
                </h2>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mt-3 alert alert-danger">{error}</div>
                )}
                {success && (
                  <div className="mt-3 alert alert-success">{success}</div>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
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
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
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
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="adminbtn adminbtn-primary w-100"
                >
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
