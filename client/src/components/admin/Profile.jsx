import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const id = localStorage.getItem("user_id");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("user_token");

  

  useEffect(() => {
    const fetchdata = async (res, req) => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user/staff/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data[0]);
        setData(response.data);
      } catch (err) {}
    };
    fetchdata();
  });

  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <div className="text-center m-5">
              <img
                src={`http://localhost:3001/uploads/profile/${data?.image}`}
                alt={data?.image}
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px" }}
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
  );
}

export default Profile;
