import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;

  // Get the message from the state (if available)
  const message = location.state?.message || "";
  if (message) {
    setError(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${URL}user/login`,
        {
          email,
          password,
        },
        { withCredentials: false }
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        if (user.role === "admin" && user.status === "active") {
          localStorage.setItem("user_id", user._id);
          localStorage.setItem("user_name", user.name);
          localStorage.setItem("user_role", user.role);
          localStorage.setItem("user_token", token);
          localStorage.setItem("isAuthenticated", true);
          navigate("/admin");
        } else if (user.role === "staff" && user.status === "active") {
          localStorage.setItem("user_id", user._id);
          localStorage.setItem("user_name", user.name);
          localStorage.setItem("user_role", user.role);
          localStorage.setItem("user_token", token);
          localStorage.setItem("isAuthenticated", true);
          navigate("/staff");
        } else {
          navigate("/login");
          setError("you are not an active user");
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
    <>
      <div className="card-title">
        <div className="text-center mt-4">
          <h2 className="text-center mb-4">
            <i className="fa fa-utensils text-primary"></i>&nbsp; Welcome Back!
          </h2>
        </div>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
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
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="row mt-3">
          <div className="col-md-6">
            <Link to="/auth/register" className="text-decoration-none link-primary">
              New User!
            </Link>
          </div>
          <div className="col-md-6">
            <p className="text-end">
              <Link
                to="/auth/forgot-password"
                className="text-decoration-none link-primary"
              >
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
