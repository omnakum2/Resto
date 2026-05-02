import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Profile() {
  const id = localStorage.getItem("user_id");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("user_token");
  const userType = localStorage.getItem("user_role");
  const URL = import.meta.env.VITE_API_BASE_URL;
  const URI = import.meta.env.VITE_IMAGE_BASE_URL;

  const handleError = (e) => {
    e.target.src = `${URI}profile/blank-profile.jpg`; // Fallback image URL
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${URL}user/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchdata();
  }, [id]);

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Profile
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to={userType === "admin" ? "/admin" : "/staff"}
            >
              <span>Back</span>
            </Link>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="text-center m-5">
                    <img
                      src={`${URI}profile/${data?.image}`}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{ width: "150px", height: "150px" }}
                      onError={handleError} // Fallback when image fails to load
                    />
                  </div>
                  <div className="mb-3">
                    <strong>Name :</strong> {data?.user?.name}
                  </div>
                  <div className="mb-3">
                    <strong>Email :</strong> {data?.user?.email}
                  </div>
                  <div className="mb-3">
                    <strong>Address :</strong> {data?.address}
                  </div>
                  <div className="mb-3">
                    <strong>Mobile :</strong> {data?.mobile}
                  </div>
                  <div className="mb-3">
                    <strong>Gender :</strong> {data?.gender}
                  </div>
                  <Link
                    className="col-12 adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
                    to={
                      userType === "admin"
                        ? "/admin/profile-edit"
                        : "/staff/profile-edit"
                    }
                  >
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
