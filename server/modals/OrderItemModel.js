const mongoose = require("mongoose")

const orderItemsSchema = mongoose.Schema(
    {
      quantity: {
        type: Number,
        default:1,
        required: [true, "quantity is required"],
      },
      food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: [true, "food id is required"],
      },
      order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: [true, "order id is required"],
      },
    },
    {
      timestamps: true,
    }
  );
  
  const OrderItem = mongoose.model("orderItems", orderItemsSchema);
  module.exports = OrderItem;