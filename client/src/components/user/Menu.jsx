import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          `${URL}category/active`
        );
        setCategories(response.data);
        if (response.data.length > 0 && !categories.find(cat => cat._id === activeTab)) {
          setActiveTab(response.data[0]._id); // Set the first category as the default active tab
        }
        // console.log(URL);
      } catch (error) {
        alert("Failed to fetch categories.");
      }
    };

    fetchCategories();
  });

  // Fetch items for the active category
  useEffect(() => {
    if (activeTab) {
      const fetchItems = async () => {
        try {
          const response = await axios.post(
            `${URL}food/${activeTab}`
          );
          setItems(response.data);
        } catch (error) {
          alert("Failed to fetch items.");
        }
      };
      fetchItems();
    }
  }, [activeTab]);

  return (
    <div>
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
                    onClick={() => setActiveTab(category._id)}
                  >
                    <div className="ps-3">
                      <h6 className="mt-n1 mb-0">{category.name}</h6>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="tab-content">
              {categories.map((category) => (
                <div
                  key={category._id}
                  id={`tab-${category._id}`}
                  className={`tab-pane fade show ${activeTab === category._id ? "active" : ""}`}
                >
                  <div className="row g-4">
                    {items.map(
                      (item) =>
                        item.category_id === category._id && ( // Display items only if they match the active category
                          <div key={item._id} className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <img
                                className="flex-shrink-0 img-fluid rounded"
                                src={`http://192.168.43.236:3001/uploads/${item.image}`} // Use actual image URL
                                alt={item.name}
                                style={{ width: "80px" }}
                              />
                              <div className="w-100 d-flex flex-column text-start ps-4">
                                <h5 className="d-flex justify-content-between border-bottom pb-2">
                                  <span>{item.name}</span>
                                  <span className="text-primary">
                                    ₹{item.price}
                                  </span>
                                </h5>
                                <small className="fst-italic">
                                  {item.description}
                                </small>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Menu End */}
    </div>
  );
}

export default Menu;
