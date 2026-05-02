import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { Link, useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
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
      name: "Order No.",
      selector: (row) => row.order_no,
    },
    {
      name: "Table No.",
      selector: (row) => row.table.table_no,
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={`adminbtn ${row.status === "open" ? "adminbtn-sm adminbtn-success" : "adminbtn-sm adminbtn-warning"}`}
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
              className="adminbtn adminbtn-danger adminbtn-sm me-2"
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
        const response = await fetch(`${URL}order/allOrders`);
        if (response.ok) {
          const result = await response.json();
          setRecords(result);
        } else {
          alert("Failed to fetch orders");
        }
      } catch (error) {
        alert("Error fetching data: " + error.message);
      }
    };
    fetchdata();
  }, []);

  // Filter the records based on search input
  const filteredRecords = records.filter((record) => {
    return record.order_no.includes(search.toLowerCase());
  });

  // viewOrder
  const handleView = (id) => {
    navigate(`/staff/view-order/${id}`);
  };

  // deleteOrder
  const handleDelete = async(id) => {
    if (window.confirm("Are you sure to delete Order?")) {
      try {
        const response = await fetch(`${URL}order/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setRecords(records.filter((record) => record.id !== id));
          alert("Order deleted successfully");
        } else {
          alert("Failed to delete order.");
        }
      } catch (err) {
        alert("Failed to delete category.");
      }
    }
  }

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Orders
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
              to="/staff"
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
                placeholder="Search by order no."
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

export default Orders;
