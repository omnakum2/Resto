import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Table() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;

  // table style
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

  // table columns
  const cols = [
    {
      name: "Table No.",
      selector: (row) => row.table_no,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={`adminbtn ${row.status === "unoccupied" ? "adminbtn-sm adminbtn-success" : "adminbtn-sm adminbtn-warning"}`}
          onClick={() => handleToggleStatus(row._id)}
        >
          {row.status}
        </button>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="adminbtn adminbtn-primary adminbtn-sm me-2"
            onClick={() => handleEdit(row._id)}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button
            className="adminbtn adminbtn-danger adminbtn-sm"
            onClick={() => handleDelete(row._id)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];

  // fetch all data
  useEffect(() => {
    const fetchdata = async (res, req) => {
      await axios
        .get(`${URL}table`)
        .then((res) => setRecords(res.data))
        .catch((err) => alert(err));
    };
    fetchdata();
  }, []);

  // Filter the records based on search input
  const filteredRecords = records.filter((record) => {
    return (
      record.table_no.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.size.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.type.toLowerCase().includes(search.toLowerCase())
    );
  });

  // edit category
  const handleEdit = (id) => {
    navigate(`/admin/table-edit/${id}`);
  };

  // delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete table?")) {
      try {
        await axios.delete(`${URL}table/${id}`);
        setRecords(records.filter((record) => record._id !== id));
        alert("Table deleted successfully");
      } catch (err) {
        alert("Failed to delete table.");
      }
    }
  };

  // toggle table status
  const handleToggleStatus = async (id) => {
    try {
      const table = records.find((record) => record._id === id);
      await axios.patch(`${URL}table/${id}`, {
        status: table.status === "occupied" ? "unoccupied" : "occupied",
      });
      setRecords(
        records.map((record) =>
          record._id === id
            ? {
                ...record,
                status:
                  record.status === "occupied" ? "unoccupied" : "occupied",
              }
            : record
        )
      );
      alert("Table status Updated");
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Tables
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to="/admin/table-add"
            >
              <span>Add</span>
            </Link>
          </div>
          <hr />

          <DataTable
            columns={cols}
            data={filteredRecords}
            customStyles={mystyle}
            pagination
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search..."
                className="col-md-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </main>
    </div>
  );
}

export default Table;
