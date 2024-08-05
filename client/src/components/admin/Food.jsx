import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Food() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

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
          src={`http://localhost:3001/uploads/${row.image}`}
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
        .get("http://localhost:3001/api/food")
        .then((res) => setRecords(res.data))
        .catch((err) => alert(err));
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
        await axios.delete(`http://localhost:3001/api/food/${id}`);
        setRecords(records.filter((record) => record._id !== id));
        alert("Food deleted successfully");
      } catch (err) {
        alert("Failed to delete Food.");
      }
    }
  };

  // toggle food status
  const handleToggleStatus = async (id) => {
    try {
      const food = records.find((record) => record._id === id);
      await axios.patch(`http://localhost:3001/api/food/${id}`, {
        status: food.status === "active" ? "deactive" : "active",
      });
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
    } catch (err) {
      alert("Failed to update status");
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
