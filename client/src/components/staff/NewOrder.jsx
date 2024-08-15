import React, { useEffect, useState } from "react";
import axios from "axios";

function NewOrder() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tables
        const tableResponse = await axios.get(
          "http://localhost:3001/api/table"
        );
        const availableTables = tableResponse.data.filter(
          (table) => table.status === "unoccupied"
        );
        setTables(availableTables);

        // Fetch food items
        const foodResponse = await axios.get("http://localhost:3001/api/food");
        setFoodItems(foodResponse.data);
      } catch (error) {
        alert("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (table) => {
    setSelectedTable(table);
    setUserId(localStorage.getItem("user_id"));
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    try {
      const orderData = {
        tableId: selectedTable._id,
        userId,
        items: [], // Add selected food items here
      };
      await axios.post("http://localhost:3001/api/order", orderData); // Adjust URL as necessary
      alert("Order placed successfully!");
      setSelectedTable(null); // Hide the form
    } catch (error) {
      alert("Error placing order: " + error);
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <section className="section staffdashboard">
          <div className="pagetitle">New Order</div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {selectedTable === null &&
                  tables.map((table, index) => (
                    <div className="col-xxl-2 col-md-6" key={index}>
                      <div
                        className="card info-card"
                        onClick={() => handleCardClick(table)}
                      >
                        <div className="card-body">
                          <h5 className="card-title card-center">Table No</h5>
                          <div>
                            <h6 className="card-center">{table.table_no}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {selectedTable && (
            <section className="section order-form">
              <form onSubmit={handleSubmitOrder}>
                <div className="row">
                  <div className="card">
                    <div className="card-title fw-bold mx-4">
                      Add Order for Table {selectedTable.table_no}
                    </div>
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div id="show_items">
                          <input
                            type="hidden"
                            name="table_id"
                            value={selectedTable._id}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="user_id"
                            value={userId}
                            readOnly
                          />
                        </div>
                      </div>
                      {/* <div className="scrollbox p-2">
                        <table
                          id="billTable"
                          className="table table-bordered"
                          style={{ width: "100%" }}
                        >
                          <thead className="text-center">
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center"></tbody>
                        </table>
                      </div> */}
                      <div className="row mt-3">
                        <div className="col-md-3">
                          <button
                            type="submit"
                            className="adminbtn adminbtn-dark"
                          >
                            Add Order
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            className="adminbtn adminbtn-secondary"
                            onClick={() => setSelectedTable(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default NewOrder;
