const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Category = require("./modals/CategoryModel");
const categoryRoute = require("./routes/categoryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/resto");

app.listen(3001, () => {
  console.log("local server running on port 3001");
});


app.use("/api/category", categoryRoute);