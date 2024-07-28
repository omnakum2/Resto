import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Header />
      <div className="container-xxl bg-white p-0">
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container my-5 py-5">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="display-3 text-white animated slideInLeft">
                  Enjoy Our
                  <br />
                  Delicious Meal
                </h1>
                <p className="text-white animated slideInLeft mb-4 pb-2">
                  The FoodCourt serve's the Authentic Taste of Indian and
                  Multicuisine food at one stop destination for your Family.
                  Dine in to taste our Delicious meal.
                </p>
                <a
                  href="/menu"
                  className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                >
                  Taste it
                </a>
              </div>
              <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                <img
                  className="assets/img-fluid"
                  src="assets/img/hero.png"
                  alt="assets/img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Start */}
      <div className="container-xl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-lg-4 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                  <h5>Quality Food</h5>
                  <p>Experience Great taste in every bite with edibleness.</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-home text-primary mb-4"></i>
                  <h5>One Stop Destination</h5>
                  <p>
                    FoodCourt is hub of varities of foods so get all your taste
                    at one place.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                  <h5>Fast Service</h5>
                  <p>
                    Checkout our online site for ordering food easily and get
                    fast service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}

      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-start">
                  <img
                    className="assets/img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.1s"
                    src="assets/img/about-1.jpg"
                    alt="assets/img"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="assets/img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.3s"
                    src="assets/img/about-2.jpg"
                    style={{ marginTop: "25%" }}
                    alt="assets/img"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="assets/img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.5s"
                    src="assets/img/about-3.jpg"
                    alt="assets/img"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="assets/img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.7s"
                    src="assets/img/about-4.jpg"
                    alt="assets/img"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                About Us
              </h5>
              <h1 className="mb-4">
                Welcome to <i className="fa fa-utensils text-primary me-2"></i>
                FoodCourt
              </h1>
              <p className="mb-4">
                where passion meets palate in a celebration of flavors and
                cultures. Nestled in the bustling heart of Jamnagar, our
                restaurant is a haven for those who appreciate fine dining and
                diverse cuisines.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                      data-toggle="counter-up"
                    >
                      10
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Years of</p>
                      <h6 className="text-uppercase mb-0">Experience</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                      data-toggle="counter-up"
                    >
                      40+
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Popular</p>
                      <h6 className="text-uppercase mb-0">Tasty Dishes</h6>
                    </div>
                  </div>
                </div>
              </div>
              <a className="btn btn-primary py-3 px-5 mt-2" href="/about">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Menu Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Food Menu
            </h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>
          <div
            className="tab-className text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  <i className="fa fa-coffee fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Popular</small>
                    <h6 className="mt-n1 mb-0">Breakfast</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-2"
                >
                  <i className="fa fa-hamburger fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Special</small>
                    <h6 className="mt-n1 mb-0">Lunch</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-3"
                >
                  <i className="fa fa-utensils fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Lovely</small>
                    <h6 className="mt-n1 mb-0">Dinner</h6>
                  </div>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <img src="../assets/img/slide-1.jpg" alt="slide-1" className="w-100" />
              </div>
              <div id="tab-2" className="tab-pane fade show p-0">
                <img src="../assets/img/slide-2.jpg" alt="slide-2" className="w-100" />
              </div>
              <div id="tab-3" className="tab-pane fade show p-0">
                <img src="../assets/img/slide-3.jpg" alt="slide-3" className="w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Menu End */}

      <Footer />
    </div>
  );
}

export default Home;
