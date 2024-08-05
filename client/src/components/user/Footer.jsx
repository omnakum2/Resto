import React from "react";

function Footer() {
  return (
    <div>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5 justify-content-center align-items-center">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Company
              </h4>
              <a className="btn-link" href="/about">
                About Us
              </a>
              <a className="btn-link" href="/contact">
                Contact Us
              </a>
              <a className="btn-link" href="/">
                Terms & Condition
              </a>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Contact
              </h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>Lalwadi Road, 
                Kaushal Nagar, Jamnagar
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+91 92423 45672
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>info@foodcourt.com
              </p>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Opening
              </h4>
              <h5 className="text-light fw-normal">Monday - Saturday</h5>
              <p>09AM - 09PM</p>
              <h5 className="text-light fw-normal">Sunday</h5>
              <p>10AM - 08PM</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="d-flex align-items-center justify-content-center">
                &copy;{" "}
                <a className="btn-link" href="/">
                  FoodCourt
                </a>
                  &nbsp;, All Right Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </div>
  );
}

export default Footer;
