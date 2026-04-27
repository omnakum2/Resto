import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { Link, useNavigate } from "react-router-dom";

function Food() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;
  const URI = process.env.REACT_APP_BASE_URL_NEW;

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
      name: "Image",
      cell: (row) => (
        <img
          src={`${URI}${row.image}`}
          alt={row.image}
          style={{ width: "100px", height: "100px", backgroundSize: "cover" }}
        />
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_id.name,
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
      name: "Featured",
      cell: (row) => (
        <button
          className={`adminbtn ${row.flag === "special" ? "adminbtn-sm adminbtn-success" : "adminbtn-sm adminbtn-warning"}`}
          onClick={() => handleToggleFlag(row._id)}
        >
          {row.flag}
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
    const fetchdata = async () => {
      try {
        const response = await fetch(`${URL}food`);
        if (response.ok) {
          const result = await response.json();
          setRecords(result);
        } else {
          alert("Failed to fetch food data");
        }
      } catch (err) {
        alert(err);
      }
    };
    fetchdata();
  }, []);

  // Filter the records based on search input
  const filteredRecords = records.filter((record) => {
    return (
      record.name.toLowerCase().includes(search.toLowerCase()) ||
      record.description.toLowerCase().includes(search.toLowerCase()) ||
      record.category_id.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // edit food
  const handleEdit = (id) => {
    navigate(`/admin/food-edit/${id}`);
  };

  // delete food
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete Food?")) {
      try {
        const response = await fetch(`${URL}food/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setRecords(records.filter((record) => record._id !== id));
          alert("Food deleted successfully");
        } else {
          alert("Failed to delete Food.");
        }
      } catch (err) {
        alert("Failed to delete Food.");
      }
    }
  };

  // toggle food status
  const handleToggleStatus = async (id) => {
    try {
      const food = records.find((record) => record._id === id);
      const response = await fetch(`${URL}food/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: food.status === "active" ? "deactive" : "active",
        }),
      });
      if (response.ok) {
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
        alert("Food status Updated");
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // toggle food status
  const handleToggleFlag = async (id) => {
    try {
      const food = records.find((record) => record._id === id);
      const response = await fetch(`${URL}food/flag/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: food.flag === "special" ? "none" : "special",
        }),
      });
      if (response.ok) {
        setRecords(
          records.map((record) =>
            record._id === id
              ? {
                  ...record,
                  flag: record.flag === "special" ? "none" : "special",
                }
              : record
          )
        );
        alert("Food Flag Updated");
      } else {
        alert("Failed to update flag");
      }
    } catch (err) {
      alert("Failed to update flag");
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Food Items
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to="/admin/food-add"
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
            fixedHeader
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

export default Food;
