import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const id = localStorage.getItem("user_id");

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
      selector: (row) => row.table_id.table_no,
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
          {row.status === "closed" ? (
            <button
              className="adminbtn adminbtn-dark adminbtn-sm me-2"
              onClick={() => handleView(row._id)}
            >
              <i className="bi bi-eye"></i>
            </button>
          ) : (
            <>
              <button
                className="adminbtn adminbtn-dark adminbtn-sm me-2"
                onClick={() => handleView(row._id)}
              >
                <i className="bi bi-eye"></i>
              </button>
              <button
                className="adminbtn adminbtn-primary adminbtn-sm me-2"
                onClick={() => handleEdit(row._id)}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                className="adminbtn adminbtn-danger adminbtn-sm"
                onClick={() => handlecheckout(row._id)}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  // fetch all data
  useEffect(() => {
    const fetchdata = async (res, req) => {
      try {
        // Fetch user orders
        const userOrderResponse = await axios.get(
          `http://localhost:3001/api/order/userOrder/${id}`
        );
        setRecords(userOrderResponse.data);
      } catch (error) {
        alert("Error fetching data: " + error.message);
      }
    };
    fetchdata();
  }, [id]);

  // Filter the records based on search input
  const filteredRecords = records.filter((record) => {
    return record.order_no.includes(search.toLowerCase());
  });

  // viewOrder
  const handleView = (id) => {
    navigate(`/staff/view-order/${id}`);
  };

  // checkoutOrder
  const handleEdit = (id) => {
    navigate(`/staff/edit-order/${id}`);
  };

  // checkoutOrder
  const handlecheckout = (id) => {
    navigate(`/staff/checkout-order/${id}`);
  };

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
