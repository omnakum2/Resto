const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: [true, "Name is required"] },
    status: {
      type: String,
      default: "active",
      enum: ['active', 'deactive'],
      required: [true, "Status is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
