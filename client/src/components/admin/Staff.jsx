import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { Link, useNavigate } from "react-router-dom";

function Staff() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("user_token");
  const URL = import.meta.env.VITE_API_BASE_URL;

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
          onClick={() => handleToggleStatus(row.id)}
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
            onClick={() => handleView(row.id)}
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className="adminbtn adminbtn-danger adminbtn-sm"
            onClick={() => handleDelete(row.id)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];

  // fetch all data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${URL}user/staff`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setRecords(result);
        } else if (response.status === 403) {
          navigate("/unAuthenticated");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

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
        const response = await fetch(`${URL}user/staff/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setRecords(records.filter((record) => record.id !== id));
          alert("User deleted successfully");
        } else {
          alert("Failed to delete user.");
        }
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  // toggle user status
  const handleToggleStatus = async (id) => {
    try {
      const user = records.find((record) => record.id === id);
      const response = await fetch(`${URL}user/staff/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: user.status === "active" ? "deactive" : "active",
        }),
      });
      if (response.ok) {
        setRecords(
          records.map((record) =>
            record.id === id
              ? {
                  ...record,
                  status: record.status === "active" ? "deactive" : "active",
                }
              : record
          )
        );
        alert("User status Updated");
      } else {
        alert("Failed to update status");
      }
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
