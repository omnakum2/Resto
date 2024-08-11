const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    order_no: {
      type: String,
      unique: true,
      required: [true, "order no is required"],
    },
    customer_mob: {
      type: String,
    },
    status: {
      type: String,
      default: "open",
    },
    grand_total: {
      type: Number,
      default: 0,
    },
    table_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "table",
      required: [true, "table id is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
