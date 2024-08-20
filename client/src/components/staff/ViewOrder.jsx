import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import html2pdf from 'html2pdf.js';

function ViewOrder() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);
  const [data, setData] = useState({});

  // Calculate total price
  const totalPrice = records.reduce((total, item) => {
    return total + item.food_id.price * item.quantity;
  }, 0);

  // fetch all data
  useEffect(() => {
    const fetchdata = async (res, req) => {
      try {
        // Fetch full order
        const response = await axios.get(
          `http://localhost:3001/api/order/viewOrder/${id}`
        );
        const { order, fullOrder } = response.data;
        setData(order);
        setRecords(fullOrder);
      } catch (error) {
        alert("Error fetching data: " + error.message);
      }
    };
    fetchdata();
  }, [id]);

  // print bill function
  const printBill = () => {
    const element = document.getElementById('print_bill');
    const options = {
      filename: `Order_${data.order_no}.pdf`,
    };
    html2pdf().from(element).set(options).save();
  };

  const getDate = data.order_no;
  const date = getDate?.substring(0,9);
  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          Order
          <div className="float-end">
            <Link
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm"
              to="/staff/orders"
            >
              <span>Back</span>
            </Link>
            <button
              className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm ms-2"
              onClick={printBill}
            >
              <span>Download PDF</span>
            </button>
          </div>
        </div>
        <hr />
        <div id="print_bill">
          <div className="card">
            <div className="card-body m-4">
              <h4 className="text-center">FoodCourt</h4>
              <span>
                <span className="h5">Order No : </span>
                <span className="fw-medium"> #{data.order_no}</span>
                <span className="float-end">
                  <span className="h5">Date :</span>{" "}
                  <span className="fw-medium">{date}</span>
                </span>
              </span>
              <hr />
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
                        {item.food_id.name}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        ₹ {item.food_id.price.toFixed(2)}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {item.quantity}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        ₹ {item.food_id.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 float-end">
                <span className="fw-bold">Grand Total : ₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewOrder;
