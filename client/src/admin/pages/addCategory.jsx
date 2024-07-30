import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    let form = e.target;
    let formData = new FormData(form);
    let category_obj = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:3001/api/category", {
        name: category_obj.name,
      });

      if (response.status === 200) {
        setSuccess("Category added successfully");
        setTimeout(() => {
          window.location.href = "/category";
        }, 2000);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      }else{
        setError("server error...");
      }
    }
  };

  return (
    <>
      <Header />
      <main id="main" className="main">
        <div className="pagetitle">
          Add Category
          <Link className="btn btn-dark btn-sm float-end" to="/category">
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
                  <button type="submit" className="btn btn-dark">
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
