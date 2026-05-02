import React, { useState } from "react";

import { Link } from "react-router-dom";

const AddCategory = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = import.meta.env.VITE_API_BASE_URL;

  const handleForm = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    let form = e.target;
    let formData = new FormData(form);
    let category_obj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${URL}category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: category_obj.name,
        }),
      });

      if (response.ok) {
        setSuccess("Category added successfully");
        setTimeout(() => {
          window.location.href = "/admin/category";
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Category addition failed");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setError("server error...");
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          Add Category
          <Link className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end" to="/admin/category">
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
                <label className="form-label mt-3">Category Name</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Category Name"
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

export default AddCategory;
