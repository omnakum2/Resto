import React from "react";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div>
      <Header />

      <main id="main" className="main">
        <section className="section dashboard">
          <div className="pagetitle">Dashboard</div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {/* Sales Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Staff</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{"totalStaff"}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Sales Card */}

                {/* Revenue Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Products</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-box"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{"totalProduct"}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Revenue Card */}

                {/* Customers Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Invoice</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-check"></i>
                        </div>
                        <div className="ms-5">
                          <h6>{"totalInvoice"}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Customers Card */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
