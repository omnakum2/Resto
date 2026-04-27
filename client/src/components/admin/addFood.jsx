import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const AddFood = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [category, setCategory] = useState([]);
  const URL = process.env.REACT_APP_BASE_URL;

  // fetch all data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${URL}category`);
        if (response.ok) {
          const result = await response.json();
          setCategory(result);
        } else {
          alert("Failed to fetch categories");
        }
      } catch (err) {
        alert(err);
      }
    };
    fetchdata();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    let form = e.target;
    let formData = new FormData(form);

    try {
      const response = await fetch(`${URL}food`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess("Food added successfully");
        setTimeout(() => {
          window.location.href = "/admin/food";
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Food addition failed");
      }
    } catch (error) {
      console.error("Error adding food:", error);
      setError("server error...");
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          Add Food
          <Link className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end" to="/admin/food">
            <span>Back</span>
          </Link>
        </div>
        <hr />
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleForm}>
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
              {success && (
                <div className="mt-3 alert alert-success">{success}</div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Food Name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Category</label>
                  <select name="category_id" id="" className="form-select">
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Enter Food Price"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Enter Food Description"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label className="form-label mt-3">Food Image</label>
                  <input
                    type="file"
                    name="image"
                    id=""
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <button type="submit" className="adminbtn adminbtn-dark">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddFood;
