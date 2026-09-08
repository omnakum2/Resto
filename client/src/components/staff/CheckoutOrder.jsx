import React, { useEffect, useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

function CheckoutOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [order_no, setOrder_no] = useState("");
  const [customer_mob, setCustomer_mob] = useState("");
  const [data, setData] = useState({});
  const URL = import.meta.env.VITE_API_BASE_URL;

  // Calculate total price
  const totalPrice = records.reduce((total, item) => {
    return total + item.food.price * item.quantity;
  }, 0);

  // checkoutOrder
  const handlecheckout = async (e) => {
    e.preventDefault();

    try {
      const data = {
        order_no: order_no,
        customer_mob: customer_mob,
      };
      const response = await fetch(`${URL}order/checkoutOrder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        alert(result.msg);
        navigate("/staff/orders");
      } else {
        alert("Checkout failed");
      }
    } catch (error) {
      alert("Error : " + error.message);
    }
  };

  // fetch all data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${URL}order/viewOrder/${id}`);
        if (response.ok) {
          const result = await response.json();
          const { order, fullOrder } = result;
          setData(order);
          setRecords(fullOrder);
          setOrder_no(order.id);
        } else {
          alert("Failed to fetch order data");
        }
      } catch (error) {
        alert("Error fetching data: " + error.message);
      }
    };
    fetchdata();
  }, [id]);
  const getDate = data.order_no;
  const date = getDate?.substring(0,9);
  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          Checkout Page
          <Link
            className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
            to="/staff/orders"
          >
            <span>Back</span>
          </Link>
        </div>
        <hr />
        <div className="card">
          <h4 className="text-center mt-4">Resto</h4>
          <div className="card-body m-4">
            <form action="" onSubmit={handlecheckout}>
              <div className="row">
                <input
                  type="hidden"
                  name="order_no"
                  value={order_no}
                  readOnly
                />
                <label htmlFor="" className="form-label">
                  Enter Mobile No.
                </label>
                <input
                  type="text"
                  name="customer_mob"
                  className="form-control"
                  placeholder="enter no."
                  value={customer_mob}
                  onChange={(e) => {
                    setCustomer_mob(e.target.value);
                  }}
                />
              </div>
              <hr />
              <span>
                <span className="h5">Order No : </span>
                <span className="fw-medium"> #{data.order_no}</span>

                <span className="float-end">
                  <span className="h5">Date :</span>{" "}
                  <span className="fw-medium">{date}</span>
                </span>
              </span>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      #
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Item
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Price
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Quantity
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {index + 1}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {item.food.name}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        ₹ {item.food.price.toFixed(2)}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {item.quantity}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        ₹ {item.food.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3">
                <span className="fw-bold float-end">
                  Grand Total : ₹{totalPrice}
                </span>
              </div>
              <button
                type="submit"
                className="adminbtn adminbtn-danger adminbtn-sm "
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutOrder;
