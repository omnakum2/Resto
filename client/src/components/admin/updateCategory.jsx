import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState({ name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${URL}category/${id}`);
        if (response.ok) {
          const result = await response.json();
          setCategory(result);
        } else {
          setError("Failed to fetch category data.");
        }
      } catch (err) {
        setError("Failed to fetch category data.");
      }
    };
    fetchCategory();
  },[id]);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    let form = e.target;
    let formData = new FormData(form);
    let category_obj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${URL}category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: category_obj.name,
        }),
      });

      if (response.ok) {
        setSuccess("Category Updated successfully");
        setTimeout(() => {
          window.location.href = "/admin/category";
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Category update failed");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setError("server error...");
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          Edit Category
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
                    value={category.name}
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <button type="submit" className="adminbtn adminbtn-dark">
                    SAVE
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

export default UpdateCategory;
