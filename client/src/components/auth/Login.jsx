import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const URL = import.meta.env.VITE_API_BASE_URL;

  // Get the message from the state (if available)
  const message = location.state?.message || "";
  if (message) {
    setError(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const { user, token } = await response.json();

        if (user.role === "admin" && user.status === "active") {
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("user_name", user.name);
          localStorage.setItem("user_role", user.role);
          localStorage.setItem("user_token", token);
          localStorage.setItem("isAuthenticated", true);
          navigate("/admin");
        } else if (user.role === "staff" && user.status === "active") {
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("user_name", user.name);
          localStorage.setItem("user_role", user.role);
          localStorage.setItem("user_token", token);
          localStorage.setItem("isAuthenticated", true);
          navigate("/staff");
        } else {
          navigate("/auth");
          setError("you are not an active user");
        }
      } else if (response.status === 404) {
        navigate("*"); // Redirect to 404 not found
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card col-sm-8 col-md-6 col-lg-4">
            <div className="card-body p-2">
            <div className="mt-3">
              <div className="text-center mb-4">
                <i
                  className="fa fa-utensils"
                  style={{ fontSize: "40px", color: "#ff9800" }}
                ></i>

                <h3 className="mt-3 fw-bold text-primary">FoodCourt</h3>

                <p className="text-muted">
                  Please sign in to your account
                </p>
              </div>
            </div>
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
                <button type="submit" className="btn btn-primary w-100 mt-2">
                  Login
                </button>
              </form>
              <div className="mt-2 mb-2 text-center">
                <Link to="/" className="text-decoration-none link-primary">
                  Go to Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
