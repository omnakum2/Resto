import React, { useEffect, useState } from "react";
import axios from "axios";

function NewOrder() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [user_id, setUserId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

        // Fetch categories
        const categoryResponse = await axios.post(
          "http://localhost:3001/api/category/active"
        );
        setCategories(categoryResponse.data);

        // Fetch food items
        const foodResponse = await axios.get("http://localhost:3001/api/food");
        setFoodItems(foodResponse.data);
      } catch (error) {
        alert("Error fetching data: " + error.message);
      }
    };
    fetchData();
  }, []);

  // Filter food items based on selected category
  const filteredFoodItems = foodItems.filter(
    (item) => item.category_id._id === selectedCategory
  );

  const handleCardClick = (table) => {
    setSelectedTable(table);
    setUserId(localStorage.getItem("user_id"));
  };

  const handleAddItem = () => {
    if (!selectedFood || !quantity) {
      // alert("Please select a food item and enter quantity.");
      setError("Please select a food item and enter quantity.");
      return;
    }
    const food = foodItems.find((item) => item._id === selectedFood);
    if (!food) {
      // alert("");
      setError("Selected food item is not valid.");
      return;
    }

    // Check if item already exists in the order
    const existingItemIndex = orderItems.findIndex(
      (item) => item.foodId === selectedFood
    );
    if (existingItemIndex !== -1) {
      // Update quantity if the item already exists
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[existingItemIndex].quantity = quantity;
      setOrderItems(updatedOrderItems);
    } else {
      // Add new item
      setOrderItems([
        ...orderItems,
        { foodId: selectedFood, name: food.name, quantity },
      ]);
    }
    setSelectedFood("");
    setQuantity("");
  };

  const handleRemoveItem = (foodId) => {
    setOrderItems(orderItems.filter((item) => item.foodId !== foodId));
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const orderData = {
        table_id: selectedTable._id,
        user_id,
        items: orderItems.map((item) => ({
          food_id: item.foodId,
          quantity: item.quantity,
        })),
      };
      const res = await axios.post(
        "http://localhost:3001/api/order/newOrder",
        orderData
      );
      // console.log("", res);
      if (res.status === 201) {
        setSuccess(res.data.msg);
        setTimeout(() => {
          window.location.href = "/staff/orders";
        }, 1000);
      }
      setOrderItems([]);
    } catch (error) {
      setError(error.message);
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
              <div className="card">
                <div className="card-title fw-bold mx-4">
                  Add Order for Table {selectedTable.table_no}
                </div>
                <div className="card-body">
                  {error && (
                    <div className="mt-3 alert alert-danger">{error}</div>
                  )}
                  {success && (
                    <div className="mt-3 alert alert-success">{success}</div>
                  )}
                  <div className="row justify-content-center">
                    <div className="row">
                      <input
                        type="hidden"
                        name="table_id"
                        value={selectedTable._id}
                        readOnly
                      />
                      <input
                        type="hidden"
                        name="user_id"
                        value={user_id}
                        readOnly
                      />
                      <div className="col-md-4 mb-3">
                        <label htmlFor="category" className="form-label">
                          Select Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          className="form-select"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">-Category-</option>
                          {categories.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="food" className="form-label">
                          Select Food
                        </label>
                        <select
                          name="food_id"
                          id="food"
                          className="form-select"
                          value={selectedFood}
                          onChange={(e) => setSelectedFood(e.target.value)}
                        >
                          <option value="">-Foods-</option>
                          {filteredFoodItems.length > 0 ? (
                            filteredFoodItems.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))
                          ) : (
                            <option value="">No foods available</option>
                          )}
                        </select>
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="quantity" className="form-label">
                          Enter Quantity
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          className="form-control"
                          id="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="Quantity"
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="" className="form-label">
                          &nbsp;
                        </label>
                        <button
                          type="button"
                          className="adminbtn adminbtn-success form-control"
                          onClick={handleAddItem}
                        >
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>

                    <div id="show_items" className="mt-3">
                      <div className="scrollbox p-2">
                        <table
                          id="billTable"
                          className="table table-bordered"
                          style={{ width: "100%" }}
                        >
                          <thead className="text-center">
                            <tr>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {orderItems.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="adminbtn adminbtn-danger"
                                    onClick={() =>
                                      handleRemoveItem(item.foodId)
                                    }
                                  >
                                    <i className="bi bi-x-lg"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="adminbtn adminbtn-dark"
                        onClick={handleSubmitOrder}
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
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default NewOrder;
