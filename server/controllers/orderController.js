const Order = require("../modals/OrderModel");
const OrderItem = require("../modals/OrderItemModel");
const Food = require("../modals/FoodModel");
const User = require("../modals/UserModel");
const mongoose = require("mongoose");

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// get price by food id
const getPrice = async (food_id) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(food_id)) {
      return { msg: "invalid foodId" };
    }

    // Fetch the food item by _id
    const food = await Food.findById(food_id);

    if (!food) {
      return { msg: "food not found" };
    }

    // Ensure the price is a valid number
    const price = parseFloat(food.price);
    if (isNaN(price)) {
      return { msg: "price is NaN" };
    }

    return price;
  } catch (error) {
    return { msg: error.message, price: 0 }; // Default value in case of error
  }
};

// new order
const newOrder = async (req, res) => {
  const { table_id, user_id, items } = req.body;

  // Validate ObjectId
  if (!isValidObjectId(table_id) || !isValidObjectId(user_id)) {
    return res.status(400).send({ msg: "Invalid table_id or user_id" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).send({ msg: "No items provided" });
  }

  try {
    // Dynamically import nanoid
    const { nanoid } = await import("nanoid");

    // Create a new order
    const order = new Order({
      table_id,
      user_id,
      order_no: nanoid(), // unique order number
    });
    await order.save();

    // Create order items
    const orderItems = items.map((item) => ({
      ...item,
      order_id: order._id,
    }));
    await OrderItem.insertMany(orderItems);

    res.status(201).send({
      msg: "Order placed successfully",
      order,
      orderItems,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// edit order
const editOrder = async (req, res) => {
  const { order_no, items } = req.body;

  if (!order_no || !Array.isArray(items)) {
    return res.status(400).send({ msg: "Order number and items are required" });
  }

  try {
    // Find the order by order_no
    const order = await Order.findById(order_no);

    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    // Check if order status is open
    if (order.status !== "open") {
      return res.status(400).send({ msg: "Order status is not open" });
    }

    // Process items
    const updatedItems = [];
    const newItems = [];

    for (const item of items) {
      if (!isValidObjectId(item.food_id)) {
        return res
          .status(400)
          .send({ msg: `Invalid food_id: ${item.food_id}` });
      }

      // Check if the item already exists in the order
      const existingItem = await OrderItem.findOne({
        order_id: order_no,
        food_id: item.food_id,
      });

      if (existingItem) {
        // Update existing item
        existingItem.quantity += item.quantity;
        await existingItem.save();
        updatedItems.push(existingItem);
      } else {
        // Add new item
        const newItem = new OrderItem({
          food_id: item.food_id,
          quantity: item.quantity,
          order_id: order_no,
        });
        await newItem.save();
        newItems.push(newItem);
      }
    }

    res.status(200).send({
      msg: "Order updated successfully",
      updatedItems,
      newItems,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// checkout order
const checkoutOrder = async (req, res) => {
  const { order_no, customer_mob } = req.body;

  if (!order_no) {
    return res.status(400).send({ msg: "Order number is required" });
  }

  const customerMobile = customer_mob || "Unknown";

  try {
    // Find the order by order_no
    const order = await Order.findById(order_no);

    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    // Fetch order items
    const orderItems = await OrderItem.find({ order_id: order_no });

    if (orderItems.length === 0) {
      return res.status(400).send({ msg: "No items found for this order" });
    }

    // Calculate grand total
    let grandTotal = 0;
    for (const item of orderItems) {
      try {
        const price = await getPrice(item.food_id); // Ensure getPrice is awaited
        if (isNaN(price)) {
          return res.status(500).send({ msg: "Invalid Price NaN" });
        }
        grandTotal += price * item.quantity;
      } catch (error) {
        return res.status(500).send({ msg: error.message });
      }
    }

    // Update order with grand total and set status to closed
    order.grand_total = grandTotal;
    order.customer_mob = customerMobile;
    order.status = "closed";
    await order.save();

    res.status(200).send({
      msg: "Order checked out successfully",
      order,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    // Delete the associated order items
    await OrderItem.deleteMany({ order_id: id });

    res.status(200).send({ msg: "Order deleted Successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// generate the invoice
const makeBill = async (req, res) => {
  const orderId = req.params.id;

  try {
    // Fetch the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    // Fetch the user based on user_id
    const user = await User.findById(order.user_id);

    // Fetch order items related to this order
    const orderItems = await OrderItem.find({ order_id: orderId }).populate(
      "food_id"
    );

    // Calculate total price and quantity
    const detailedOrderItems = orderItems.map(item => {
      const itemPrice = item.food_id.price || 0;
      const total = item.quantity * itemPrice;
      return {
        ...item._doc,
        total
      };
    });

    // Respond with order, user, and order items
    res.status(200).send({
      order,
      user: user ? { username: user.name } : { username: "Unknown" },
      orderItems:detailedOrderItems,
    });
  } catch (error) {
    console.error("Error fetching order and order items:", error.message);
    res.status(500).send({ msg: error.message });
  }
};

module.exports = { newOrder, editOrder, checkoutOrder, deleteOrder, makeBill };
