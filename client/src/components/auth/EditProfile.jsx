import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const id = localStorage.getItem("user_id");
  const token = localStorage.getItem("user_token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userType = localStorage.getItem("user_role");

  const handleError = (e) => {
    e.target.src = "http://localhost:3001/uploads/profile/blank-profile.jpg"; // Fallback image URL
  };

  useEffect(() => {
    const fetchdata = async (res, req) => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user/profile/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { address, mobile, gender, image } = response.data;
        const { name, email } = response.data.user_id;
        setName(name);
        setEmail(email);
        setMobile(mobile);
        setAddress(address);
        setGender(gender);
        setImage(image);
      } catch (err) {}
    };
    fetchdata();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    let form = e.target;
    let formData = new FormData(form);

    try {
      const response = await axios.put(
        `http://localhost:3001/api/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Profile Updated successfully");
        setTimeout(() => {
          window.location.href =
            userType === "admin" ? "/admin/profile" : "/staff/profile";
        }, 2000);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("server error...");
      }
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Edit Profile
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to={userType === "admin" ? "/admin/profile" : "/staff/profile"}
            >
              <span>Back</span>
            </Link>
          </div>
          <hr />
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleForm}>
                {error && (
                  <div className="mt-3 alert alert-danger">{error}</div>
                )}
                {success && (
                  <div className="mt-3 alert alert-success">{success}</div>
                )}

                <div className="row">
                  <div className="col-md-4">
                    <label className="form-label mt-3">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label mt-3">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label mt-3">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      placeholder="Enter Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label mt-3">Address</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label mt-3">Select Gender</label>
                    <div className="form-group">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="form-check-label"> Male</label>
                      &nbsp; &nbsp; &nbsp;
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label className="form-label mt-3">Profile Image</label>
                    <img
                      src={`http://localhost:3001/uploads/profile/${image}`}
                      alt={name}
                      style={{ width: "100px", height: "100px" }}
                      onError={handleError} // Fallback when image fails to load
                      className="mx-3"
                    />
                    <input
                      type="file"
                      name="image"
                      id=""
                      className="mt-4 form-control"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <button type="submit" className="adminbtn adminbtn-dark">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
