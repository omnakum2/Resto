import React from "react";

function UnAuthorized() {
  return (
    <div>
      <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <span className="display-1 fw-bold">4</span>
                  <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
                  <span className="display-1 fw-bold bsb-flip-h">3</span>
                </h2>
                <h3 className="h2 mb-2">Access Denied</h3>
                <p className="mb-5">
                  The page you are looking for is accessible by admins only.
                </p>
                <a
                  className="adminbtn text-decoration-none bsb-btn-5xl adminbtn-dark rounded-pill px-5 fs-6 m-0"
                  href="/staff"
                  role="button"
                >
                  Back to staff Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UnAuthorized;
