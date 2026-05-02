import React, { useEffect, useState } from "react";


function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const URL = import.meta.env.VITE_API_BASE_URL;
  const URI = import.meta.env.VITE_IMAGE_BASE_URL;

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}category/active`, {
          method: "POST",
        });
        if (response.ok) {
          const result = await response.json();
          setCategories(result);
          // Set active tab to the first category if not already set
          if (result.length > 0 && !activeTab) {
            setActiveTab(result[0].id);
          }
        } else {
          alert("Failed to fetch categories.");
        }
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
          const response = await fetch(`${URL}food/${activeTab}`, {
            method: "POST",
          });
          if (response.ok) {
            const result = await response.json();
            setItems(result);
          } else {
            alert("Failed to fetch items.");
          }
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
                <li className="nav-item" key={category.id}>
                  <a
                    className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${parseInt(activeTab) === category.id ? "active" : ""}`}
                    data-bs-toggle="pill"
                    href={`#tab-${category.id}`}
                    onClick={() => setActiveTab(category.id)}
                    style={{ cursor: "pointer" }}
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
                  key={category.id}
                  id={`tab-${category.id}`}
                  className={`tab-pane fade show ${parseInt(activeTab) === category.id ? "active" : ""}`}
                >
                  <div className="row g-4">
                    {items.map(
                      (item) =>
                        (item.category?.id === category.id || item.category_id === category.id) && ( // Support both relation and raw ID
                          <div key={item.id} className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <img
                                className="flex-shrink-0 img-fluid rounded"
                                src={`${URI}${item.image}`}
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
