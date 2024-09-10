import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx"; // Ensure you have this dependency

function Reports() {
  const [data, setData] = useState([]);
  const [reportType, setReportType] = useState("month"); // Default type
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // Added for download state
  const [error, setError] = useState(null); // Added for error handling
  const year = new Date().getFullYear();
  const URL = process.env.REACT_APP_BASE_URL;

  // Fetch data based on the selected report type
  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const responses = {
        month: await axios.get(`${URL}report/monthlySales`),
        year: await axios.get(`${URL}report/yearlySales`),
        user: await axios.get(`${URL}report/userSales`),
        mostSell: await axios.get(
          `${URL}report/getMostSell`
        ),
      };

      const response = responses[reportType];

      if (response.status === 200) {
        setData(response.data);
      } else {
        alert("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log error for debugging
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading state is turned off
    }
  };

  useEffect(() => {
    fetchData();
  },[reportType]);

  // Print function
  const print = () => {
    const element = document.getElementById("print");
    const options = {
      filename: `${reportType}_report.pdf`,
    };
    setIsDownloading(true); // Set downloading state
    setTimeout(() => {
      html2pdf().from(element).set(options).save();
      setIsDownloading(false); // Reset downloading state
    }, 1500); // Delay of 1.5 seconds
  };

  // Download Excel function
  const downloadExcel = () => {
    const table = document.querySelector("table");
    if (table) {
      setIsDownloading(true); // Set downloading state
      setTimeout(() => {
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report Data");
        XLSX.writeFile(wb, `${reportType}_report.xlsx`);
        setIsDownloading(false); // Reset downloading state
      }, 1500); // Delay of 1.5 seconds
    } else {
      alert("No table found to download");
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="container">
          <div className="pagetitle">
            Reports
            <div className="row mt-3">
              <div className="col">
                <select
                  name="sales"
                  className="form-select w-50"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                  <option value="user">UserWise</option>
                  <option value="mostSell">Most Sell</option>
                </select>
              </div>
              <div className="col">
                <div className="float-end">
                  <Link
                    className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm"
                    to="/admin"
                  >
                    <span>Back</span>
                  </Link>
                  <button
                    className="adminbtn text-decoration-none adminbtn-success adminbtn-sm ms-2"
                    onClick={downloadExcel}
                    disabled={isDownloading}
                  >
                    <span>
                      {isDownloading ? "Downloading..." : "Download Excel"}
                    </span>
                  </button>
                  <button
                    className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm ms-2"
                    onClick={print}
                    disabled={isDownloading}
                  >
                    <span>
                      {isDownloading ? "Downloading..." : "Download PDF"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div id="print">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="card">
                {reportType === "month" && (
                  <>
                    <h4 className="text-center card-title">
                      Monthly Sales Report
                    </h4>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.month}</td>
                              <td>{item.totalSales}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {reportType === "year" && (
                  <>
                    <h4 className="text-center card-title">
                      Yearly Sales Report
                    </h4>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Year</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.year}</td>
                              <td>{item.totalSales}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {reportType === "user" && (
                  <>
                    <h4 className="text-center card-title">
                      UserWise Sales Report
                    </h4>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.userName}</td>
                              <td>{item.totalSales}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {reportType === "mostSell" && (
                  <>
                    <h4 className="text-center card-title">
                      Most Sold Food Items Report
                    </h4>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Food</th>
                            <th>Total Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.monthName}</td>
                              <td>{item.food_name}</td>
                              <td>{item.totalQuantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reports;
