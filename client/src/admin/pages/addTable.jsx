import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const AddTable = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    let form = e.target;
    let formData = new FormData(form);
    let table_obj = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("http://localhost:3001/api/table", {
        table_no: table_obj.table_no,
        size: table_obj.size,
        type: table_obj.type,
      });

      if (response.status === 200) {
        setSuccess("Table added successfully");
        setTimeout(() => {
          window.location.href = "/table";
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
          Add Table
          <Link className="btn btn-dark btn-sm float-end" to="/table">
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
                <label className="form-label mt-3">Table No</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    name="table_no"
                    className="form-control"
                    placeholder="Enter Table No"
                  />
                </div>
              </div>
              <div className="row">
                <label className="form-label mt-3">Table Size</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    name="size"
                    className="form-control"
                    placeholder="Enter Table Size 4-6 persons"
                  />
                </div>
              </div>
              <div className="row">
                <label className="form-label mt-3">Table Type</label>
              </div>
              <div className="row">
                <div className="col">
                  <select name="type" className="form-select">
                    <option value="AC">AC</option>
                    <option value="Non/AC">Non/AC</option>
                  </select>
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

export default AddTable;
