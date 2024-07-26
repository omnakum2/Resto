const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    price: { type: Number, default: 0, required: [true, "price is required"] },
    description: { type: String, required: [true, "description is required"] },
    image: { type: String, required: [true, "image is required"] },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category',required: [true, "category id is required"] },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("food", foodSchema);
module.exports = Food;
