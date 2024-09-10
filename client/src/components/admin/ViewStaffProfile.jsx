import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function StaffProfile() {
  const { id } = useParams();
  const { navigate } = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("user_token");
  const URL = process.env.REACT_APP_BASE_URL;
  const URI = process.env.REACT_APP_BASE_URL_NEW;

  const handleError = (e) => {
    e.target.src = `${URI}profile/blank-profile.jpg`; // Fallback image URL
  };

  useEffect(() => {
    const fetchdata = async (res, req) => {
      try {
        const response = await axios.get(
          `${URL}user/profile/` + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data[0]);
        setData(response.data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          navigate("/unAuthenticated");
        }
      }
    };
    fetchdata();
  }, [id]);

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Staff Profile
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to="/admin/staff"
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
                      src={`http://localhost:3001/uploads/profile/${data?.image}`}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{ width: "150px", height: "150px" }}
                      onError={handleError} // Fallback when image fails to load
                    />
                  </div>
                  <div className="mb-3">
                    <strong>Name :</strong> {data?.user_id?.name}
                  </div>
                  <div className="mb-3">
                    <strong>Email :</strong> {data?.user_id?.email}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StaffProfile;
