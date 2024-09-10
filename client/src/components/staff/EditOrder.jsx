import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.post(
          `${URL}category/active`
        );
        setCategories(categoryResponse.data);

        // Fetch food items
        const foodResponse = await axios.get(`${URL}food`);
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

  const handleAddItem = () => {
    if (!selectedFood || !quantity) {
      setError("Please select a food item and enter quantity.");
      return;
    }

    const food = foodItems.find((item) => item._id === selectedFood);
    if (!food) {
      setError("Selected food item is not valid.");
      return;
    }

    // Convert quantity to number
    const quantityNumber = parseInt(quantity, 10);
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    // Check if item already exists in the order
    const existingItemIndex = orderItems.findIndex(
      (item) => item.foodId === selectedFood
    );

    if (existingItemIndex !== -1) {
      // Update quantity by adding to the existing quantity
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[existingItemIndex].quantity += quantityNumber;
      setOrderItems(updatedOrderItems);
    } else {
      // Add new item with the given quantity
      setOrderItems([
        ...orderItems,
        { foodId: selectedFood, name: food.name, quantity: quantityNumber },
      ]);
    }

    // Clear selection and quantity
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
        order_no: id,
        items: orderItems.map((item) => ({
          food_id: item.foodId,
          quantity: item.quantity,
        })),
      };
      const res = await axios.put(
        `${URL}order/editOrder`,
        orderData
      );
      // console.log("", res);
      if (res.status === 200) {
        setSuccess(res.data.msg);
        setTimeout(() => {
          navigate("/staff/orders");
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
          <div className="pagetitle">Edit Order</div>
          <section className="section order-form">
            <div className="card">
              <div className="card-title fw-bold mx-4">Edit Order No.</div>
              <div className="card-body">
                {error && (
                  <div className="mt-3 alert alert-danger">{error}</div>
                )}
                {success && (
                  <div className="mt-3 alert alert-success">{success}</div>
                )}
                <div className="row justify-content-center">
                  <div className="row">
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
                                  onClick={() => handleRemoveItem(item.foodId)}
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
                      Save
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="adminbtn adminbtn-secondary"
                      onClick={() => navigate("/staff/orders")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default EditOrder;
