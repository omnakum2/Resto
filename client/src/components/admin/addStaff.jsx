import React, { useState } from "react";
import { Link } from "react-router-dom";


function AddStaff() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_as: "staff",
    status: "active",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = import.meta.env.VITE_API_BASE_URL;

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
      const response = await fetch(`${URL}user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Registration Successful");
        setTimeout(() => {
          window.location.href = "/admin/staff";
        }, 500);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server error...");
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          Add Staff
          <Link className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end" to="/admin/staff">
            <span>Back</span>
          </Link>
        </div>
        <hr />
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
              {success && (
                <div className="mt-3 alert alert-success">{success}</div>
              )}
              <div className="row">
                <label className="form-label mt-3">Staff Name</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus="on"
                    placeholder="Enter Staff Name"
                  />
                </div>
              </div>
              <div className="row">
                <label className="form-label mt-3">Staff Email</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter Staff Email"
                  />
                </div>
              </div>
              <div className="row">
                <label className="form-label mt-3">Password</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="row">
                <label className="form-label mt-3">Confirm Password</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter Confirm Password"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <button type="submit" className="adminbtn adminbtn-dark">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddStaff;
