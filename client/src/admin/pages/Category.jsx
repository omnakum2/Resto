import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Category() {
  const [records, setRecords] = useState("");
  const mystyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };
  useEffect(() => {
    const fetchdata = async (res, req) => {
      axios
        .get("http://localhost:3001/api/category")
        .then((res) => setRecords(res.data))
        .catch((err) => alert(err));
    };
    fetchdata();
  }, []);
  const cols = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
    },
  ];
  return (
    <div>
      <Header />
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Categories
            <Link
              className="btn btn-dark btn-sm float-end"
              to="category-add"
            >
              <span>Add</span>
            </Link>
          </div>
          <hr />
          <input
            type="search"
            className="mb-4 col-3 form-control float-end"
            placeholder="Search..."
          />

          <DataTable
            columns={cols}
            data={records}
            customStyles={mystyle}
            pagination
            selectableRows
          ></DataTable>
        </div>
      </main>
    </div>
  );
}

export default Category;
