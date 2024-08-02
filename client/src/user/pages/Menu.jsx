import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState({});
  const [activeTab, setActiveTab] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/category");
        setCategories(response.data);
        setActiveTab(response.data[0]?._id); // Set the first category as active tab
      } catch (error) {
        alert("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch items for the active category
  useEffect(() => {
    if (activeTab) {
      const fetchItems = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/food?category_id=${activeTab}`
          );
          setItems((prevItems) => ({
            ...prevItems,
            [activeTab]: response.data,
          }));
        } catch (error) {
          alert("Failed to fetch items.");
        }
      };

      fetchItems();
    }
  }, [activeTab]);

  // console.log(records);
  return (
    <div>
      <Header />
      <div className="container-xxl py-5 bg-secondary hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Food Menu
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Menu
              </li>
            </ol>
          </nav>
        </div>
      </div>

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
            className="tab-class text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
              {categories.map((category) => (
                <li className="nav-item" key={category._id}>
                  <a
                    className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === category._id ? "active" : ""}`}
                    data-bs-toggle="pill"
                    href={`#tab-${category._id}`}
                  onClick={(e) => setActiveTab(category._id)}
                  >
                    <div className="ps-3">
                      <h6 className="mt-n1 mb-0">{category.name}</h6>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded"
                        src="assets/img/bg-hero.jpg"
                        alt="img"
                        style={{ width: "80px" }}
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                          <span>food</span>
                          <span className="text-primary">₹1</span>
                        </h5>
                        <small className="fst-italic">aaa</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded"
                        src="assets/img/bg-hero.jpg"
                        alt="img"
                        style={{ width: "80px" }}
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                          <span>food</span>
                          <span className="text-primary">₹1</span>
                        </h5>
                        <small className="fst-italic">aaa</small>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Menu;
