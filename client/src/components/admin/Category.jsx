import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { Link, useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const URL = import.meta.env.VITE_API_BASE_URL;

  // table style
  const mystyle = {
    headRow: {
      style: {
        backgroundColor: "#3f2d18",
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
            className="adminbtn adminbtn-primary adminbtn-sm me-2"
            onClick={() => handleEdit(row.id)}
          >
            <i className="bi bi-pencil-fill"></i>
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
        const response = await fetch(`${URL}category`);
        if (response.ok) {
          const result = await response.json();
          setRecords(result);
        } else {
          alert("Failed to fetch categories");
        }
      } catch (err) {
        alert(err);
      }
    };
    fetchdata();
  }, []);

  // Filter the records based on search input
  const filteredRecords = records.filter((record) => {
    return record.name.toLowerCase().includes(search.toLowerCase());
  });

  // edit category
  const handleEdit = (id) => {
    navigate(`/admin/category-edit/${id}`);
  };

  // delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete category?")) {
      try {
        const response = await fetch(`${URL}category/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setRecords(records.filter((record) => record.id !== id));
          alert("Category deleted successfully");
        } else {
          alert("Failed to delete category.");
        }
      } catch (err) {
        alert("Failed to delete category.");
      }
    }
  };

  // toggle category status
  const handleToggleStatus = async (id) => {
    try {
      const category = records.find((record) => record.id === id);
      const response = await fetch(`${URL}category/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: category.status === "active" ? "deactive" : "active",
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
        alert("Category status Updated");
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
            Categories
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to="/admin/category-add"
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

export default Category;
