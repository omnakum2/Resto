import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Staff() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("user_token");
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={`adminbtn ${row.status === "active" ? "adminbtn-sm adminbtn-success" : "adminbtn-sm adminbtn-warning"}`}
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
            className="adminbtn adminbtn-dark adminbtn-sm me-2"
            onClick={() => handleView(row._id)}
          >
            <i className="bi bi-eye"></i>
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
      try {
        const response = await axios.get(
          `${URL}user/staff`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecords(response.data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          navigate("/unAuthenticated");
        }
      }
    };
    fetchdata();
  },);

  // Filter the records based on search input
  const filteredRecords = records.filter((record) => {
    return record.name.toLowerCase().includes(search.toLowerCase()) ||
    record.email.toLowerCase().includes(search.toLowerCase())
  });

  // edit category
  const handleView = (id) => {
    navigate(`/admin/staff-profile/${id}`);
  };

  // delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete user?")) {
      try {
        await axios.delete(`${URL}user/staff/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(records.filter((record) => record._id !== id));
        alert("User deleted successfully");
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  // toggle user status
  const handleToggleStatus = async (id) => {
    try {
      const user = records.find((record) => record._id === id);
      await axios.patch(
        `${URL}user/staff/${id}`,
        {
          status: user.status === "active" ? "deactive" : "active",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecords(
        records.map((record) =>
          record._id === id
            ? {
                ...record,
                status: record.status === "active" ? "deactive" : "active",
              }
            : record
        )
      );
      alert("User status Updated");
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Staff
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to="/admin"
            >
              <span>Back</span>
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
                placeholder="Search email"
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

export default Staff;
