import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const backgroundStyle = {
  background: "linear-gradient(135deg, #87CEEB, #2F4F4F)", // Deep blue to purple gradient
  height: "100vh", // Full viewport height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("userId", user._id);
        console.log(user._id);
        alert("Login successful!");
        console.log(user.role_as);
        if (user.role_as === "admin") {
          navigate("/admin"); // Redirect to home page
        } else {
          navigate("/"); // Redirect to Admin page
        }
      } else {
        navigate("*"); // Redirect to 404 not found
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        console.error("Error:", error);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={backgroundStyle}>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="card col-sm-8 col-md-6 col-lg-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card-title">
              <div className="text-center mt-4">
                <h2 className="text-center mb-4">
                  <i className="fa fa-utensils admintext-primary"></i>&nbsp;
                  Welcome Back!
                </h2>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="adminbtn adminbtn-primary w-100"
                >
                  Login
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/register" className="link-primary">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
