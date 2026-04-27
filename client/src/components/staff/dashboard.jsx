import React, { useEffect, useState } from "react";


function Dashboard() {
  const [data, setData] = useState("");
  const [food, setFood] = useState([]);
  const id = localStorage.getItem("user_id");
  const URL = process.env.REACT_APP_BASE_URL;

  // get special food
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const foodResponse = await fetch(`${URL}dashboard/getSpecialItem`);
        if (foodResponse.ok) {
          const result = await foodResponse.json();
          setFood(result);
        } else {
          alert("No data Found");
        }
      } catch (error) {
        console.error("Error fetching special items:", error);
      }
    };
    fetchdata();
  }, [id]);

  // fetch all data
  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const foodResponse = await fetch(`${URL}dashboard/getSpecialItem`);
        const totalResponse = await fetch(`${URL}dashboard/getStaffTotal/` + id);

        if (foodResponse.ok) {
          const foodResult = await foodResponse.json();
          setFood(foodResult);
        } else {
          alert("No special item data Found");
        }

        if (totalResponse.ok) {
          const totalResult = await totalResponse.json();
          setData(totalResult);
        } else {
          alert("No total data Found");
        }
      } catch (error) {
        console.error("Error fetching dashboard totals:", error);
      }
    };
    fetchTotalData();
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
