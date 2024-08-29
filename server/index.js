const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoute = require("./routes/categoryRoutes");
const tableRoute = require("./routes/tableRoute");
const foodRoute = require("./routes/foodRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");
const reportRoute = require("./routes/reportRoutes");
const profileRoute = require("./routes/profileRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/resto");

app.listen(3001, () => {
  console.log("local server running on port 3001");
});

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/table", tableRoute);
app.use("/api/food", foodRoute);
app.use("/api/order", orderRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/report", reportRoute);
app.use("/api/profile", profileRoute);
app.use("/uploads", express.static("uploads"));
