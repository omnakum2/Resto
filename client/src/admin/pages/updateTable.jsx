import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";

const UpdateTable = () => {
  const { id } = useParams(); // Get the table ID from the URL
  const [table_no, setTable_no] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("AC"); // Default value should be one of the select options
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/table/${id}`);
        const { table_no, size, type } = response.data;
        setTable_no(table_no);
        setSize(size);
        setType(type);
        // console.log(type);
      } catch (err) {
        setError("Failed to fetch table data.");
      }
    };
    fetchTable();
  }, [id]);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:3001/api/table/${id}`,
        {
          table_no,
          size,
          type,
        }
      );

      if (response.status === 200) {
        setSuccess("Table updated successfully");
        setTimeout(() => {
          window.location.href = "/table";
        }, 2000);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("Server error...");
      }
    }
  };

  return (
    <>
      <Header />
      <main id="main" className="main">
        <div className="pagetitle">
          Edit Table
          <Link className="btn btn-dark btn-sm float-end" to="/table">
            <span>Back</span>
          </Link>
        </div>
        <hr />
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleForm}>
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
              {success && <div className="mt-3 alert alert-success">{success}</div>}
              <div className="row">
                <label className="form-label mt-3">Table No</label>
                <div className="col">
                  <input
                    type="text"
                    name="table_no"
                    className="form-control"
                    placeholder="Enter Table No"
                    value={table_no}
                    onChange={(e) => setTable_no(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <label className="form-label mt-3">Table Size</label>
                <div className="col">
                  <input
                    type="text"
                    name="size"
                    className="form-control"
                    placeholder="Enter Table Size 4-6 persons"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <label className="form-label mt-3">Table Type</label>
                <div className="col">
                  <select
                    name="type"
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)} // Update state with selected value
                  >
                    <option value="AC">AC</option>
                    <option value="Non/AC">Non/AC</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <button type="submit" className="btn btn-dark">
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

export default UpdateTable;
