import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState("");
  const [food, setFood] = useState([]);
  const id = localStorage.getItem("user_id");
  const URL = process.env.REACT_APP_BASE_URL;

  // get special food
  useEffect(() => {
    const fetchdata = async (res, req) => {
      try {
        const foodResponse = await axios.get(
          `${URL}dashboard/getSpecialItem`
        );

        if (foodResponse.status === 200) {
          setFood(foodResponse.data);
        } else {
          alert("No data Found");
        }
      } catch (error) {}
    };
    fetchdata();
  }, [id]);

  // fetch all data
  useEffect(() => {
    const fetchdata = async (res, req) => {
      try {
        const foodResponse = await axios.get(
          `${URL}dashboard/getSpecialItem`
        );

        const response = await axios.get(
          `${URL}dashboard/getStaffTotal/` + id
        );

        if (foodResponse.status === 200) {
          setFood(foodResponse.data);
        } else {
          alert("No data Found");
        }
        console.log(foodResponse.data);

        if (response.status === 200) {
          setData(response.data);
        } else {
          alert("No data Found");
        }
      } catch (error) {}
    };
    fetchdata();
  }, [id]);

  return (
    <div>
      <main id="main" className="main">
        <section className="section dashboard">
          <div className="pagetitle">Dashboard</div>
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {/* order Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card order-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Orders</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-list-check"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data?.orders || 0}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* open order Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card staffOpenOrder-card">
                    <div className="card-body">
                      <h5 className="card-title">Active Orders</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-arrow-up"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data?.openOrder || 0}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* close order Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card staffCloseOrder-card">
                    <div className="card-body">
                      <h5 className="card-title">Closed Orders</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-arrow-down"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data?.closeOrder || 0}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Today's Special Menu</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {food.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
