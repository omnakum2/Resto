import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

const UpdateTable = () => {
  const { id } = useParams(); // Get the table ID from the URL
  const [table_no, setTable_no] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("AC"); // Default value should be one of the select options
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await fetch(`${URL}table/${id}`);
        if (response.ok) {
          const result = await response.json();
          const { table_no, size, type } = result;
          setTable_no(table_no);
          setSize(size);
          setType(type);
        } else {
          setError("Failed to fetch table data.");
        }
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
      const response = await fetch(`${URL}table/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_no,
          size,
          type,
        }),
      });

      if (response.ok) {
        setSuccess("Table updated successfully");
        setTimeout(() => {
          window.location.href = "/admin/table";
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Table update failed");
      }
    } catch (error) {
      console.error("Error updating table:", error);
      setError("Server error...");
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          Edit Table
          <Link className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end" to="/admin/table">
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

export default UpdateTable;
