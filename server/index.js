const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// routes
const categoryRoute = require("./routes/categoryRoutes");
const tableRoute = require("./routes/tableRoute");
const foodRoute = require("./routes/foodRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");
const reportRoute = require("./routes/reportRoutes");
const profileRoute = require("./routes/profileRoutes");
const qrcodeRoute = require("./routes/qrcodeRoutes");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3001, () => {
  console.log("local server running on port 3001");
});

app.get("/demo",(req,res) => {
  res.send("hello");
})

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/table", tableRoute);
app.use("/api/food", foodRoute);
app.use("/api/order", orderRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/report", reportRoute);
app.use("/api/profile", profileRoute);
app.use("/api/QRCode", qrcodeRoute);
app.use("/uploads", express.static("uploads"));
