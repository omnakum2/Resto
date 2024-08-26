import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [data, setData] = useState("");

  // fetch all data
  useEffect(() => {
    const fetchdata = async (res, req) => {
      await axios
        .get("http://localhost:3001/api/dashboard/getAdminTotal")
        .then((res) => setData(res.data))
        .catch((err) => alert(err));
    };
    fetchdata();
  }, []);

  return (
    <div>
      <main id="main" className="main">
        <section className="section dashboard">
          <div className="pagetitle">Dashboard</div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {/* Staff Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card staff-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Staff</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people-fill"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data.staff}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Food Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card food-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Food</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-box-fill"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data.food}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* income Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card income-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Income</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-rupee"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data.income}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-12">
              <div className="row">
                {/* table Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card table-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Table</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-table"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data.table}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* category Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card category-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Category</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-stack"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data.category}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* order Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card order-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Orders</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-list-check"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{data.orders}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
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
