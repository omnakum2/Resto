const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const categoryRoute = require("./routes/categoryRoutes");
const tableRoute = require("./routes/tableRoute");
const foodRoute = require("./routes/foodRoutes");
const userRoute = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/resto");

app.listen(3001, () => {
  console.log("local server running on port 3001");
});


app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/table", tableRoute);
app.use("/api/food", foodRoute);
app.use("/uploads", express.static("uploads"));