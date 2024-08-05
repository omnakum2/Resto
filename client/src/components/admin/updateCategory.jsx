import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState({ name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/category/${id}`
        );
        setCategory(response.data);
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
      const response = await axios.put(
        `http://localhost:3001/api/category/${id}`,
        {
          name: category_obj.name,
        }
      );

      if (response.status === 200) {
        setSuccess("Category Updated successfully");
        setTimeout(() => {
          window.location.href = "/admin/category";
        }, 2000);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("server error...");
      }
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
