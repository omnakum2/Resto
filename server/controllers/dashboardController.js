const Food = require("../modals/FoodModel");
const User = require("../modals/UserModel");
const Table = require("../modals/TableModel");
const Order = require("../modals/OrderModel");
const Category = require("../modals/CategoryModel");

const getAdminCount = async (req, res) => {
  try {
    // get total number of staff users
    const totalStaff = await User.countDocuments({ role: "staff" });
    if (!totalStaff) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get total number of food items
    const totalFood = await Food.countDocuments();
    if (!totalFood) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get total number of income
    const orders = await Order.find({}, "grand_total");
    const totalIncome = orders.reduce(
      (sum, order) => sum + (order.grand_total || 0),
      0
    );
    if (!totalIncome) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get total number of table
    const totalTable = await Table.countDocuments();
    if (!totalTable) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get total number of category
    const totalCategory = await Category.countDocuments();
    if (!totalCategory) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get total number of orders
    const totalOrders = await Order.countDocuments();
    if (!totalOrders) {
      return res.status(404).send({ msg: "no data available" });
    }

    return res.status(200).send({
      staff: totalStaff,
      food: totalFood,
      income: totalIncome,
      table: totalTable,
      category: totalCategory,
      orders: totalOrders,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getStaffCount = async (req, res) => {
  try {
    const id = req.params.id;

    // get total number of orders
    const totalOrders = await Order.countDocuments({ user_id: id });
    if (!totalOrders) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get total number of orders
    const totalOpenOrders = await Order.countDocuments({
      user_id: id,
      status: "open",
    });
    if (!totalOpenOrders) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get total number of orders
    const totalClosedOrders = await Order.countDocuments({
      user_id: id,
      status: "closed",
    });
    if (!totalClosedOrders) {
      return res.status(404).send({ msg: "no data available" });
    }

    // get all special foods
    const getSpecialFood = await Food.find({
      status: "active",
      flag: "special",
    });
    if (!getSpecialFood) {
      return res.status(404).send({ msg: "no data available" });
    }

    return res.status(200).send({
      orders: totalOrders,
      openOrder: totalOpenOrders,
      closeOrder: totalClosedOrders,
      food: getSpecialFood,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  getAdminCount,
  getStaffCount,
};
