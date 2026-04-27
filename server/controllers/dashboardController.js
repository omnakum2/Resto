const AppDataSource = require("../config/database");
const FoodEntity = require("../entities/FoodEntity");
const UserEntity = require("../entities/UserEntity");
const TableEntity = require("../entities/TableEntity");
const OrderEntity = require("../entities/OrderEntity");
const CategoryEntity = require("../entities/CategoryEntity");

const foodRepository = AppDataSource.getRepository(FoodEntity);
const userRepository = AppDataSource.getRepository(UserEntity);
const tableRepository = AppDataSource.getRepository(TableEntity);
const orderRepository = AppDataSource.getRepository(OrderEntity);
const categoryRepository = AppDataSource.getRepository(CategoryEntity);

const getAdminCount = async (req, res) => {
  try {
    const totalStaff = await userRepository.countBy({ role: "staff" });
    const totalFood = await foodRepository.count();
    
    const orders = await orderRepository.find({
      select: ["grand_total"],
    });
    const totalIncome = orders.reduce(
      (sum, order) => sum + (parseFloat(order.grand_total) || 0),
      0
    );

    const totalTable = await tableRepository.count();
    const totalCategory = await categoryRepository.count();
    const totalOrders = await orderRepository.count();

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

    const totalOrders = await orderRepository.countBy({ user: { id: parseInt(id) } });
    const totalOpenOrders = await orderRepository.countBy({
      user: { id: parseInt(id) },
      status: "open",
    });
    const totalClosedOrders = await orderRepository.countBy({
      user: { id: parseInt(id) },
      status: "closed",
    });

    return res.status(200).send({
      orders: totalOrders,
      openOrder: totalOpenOrders,
      closeOrder: totalClosedOrders,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getSpecialItem = async (req, res) => {
  try {
    const getSpecialFood = await foodRepository.findBy({
      status: "active",
      flag: "special",
    });
    if (!getSpecialFood || getSpecialFood.length === 0) {
      return res.status(404).send({ msg: "no data available" });
    }
    return res.status(200).send(getSpecialFood);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  getAdminCount,
  getStaffCount,
  getSpecialItem,
};

module.exports = {
  getAdminCount,
  getStaffCount,
  getSpecialItem,
};
