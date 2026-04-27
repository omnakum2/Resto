const AppDataSource = require("../config/database");
const OrderItemEntity = require("../entities/OrderItemEntity");
const OrderEntity = require("../entities/OrderEntity");
const FoodEntity = require("../entities/FoodEntity");

const orderItemRepository = AppDataSource.getRepository(OrderItemEntity);
const orderRepository = AppDataSource.getRepository(OrderEntity);

const getMonthlyMostSoldFoodItems = async () => {
  try {
    // Using raw SQL for complex aggregation that is easier than QueryBuilder for this specific case
    const result = await AppDataSource.query(`
      SELECT 
        f.name as food_name,
        SUM(oi.quantity) as totalQuantity,
        MONTHNAME(oi.createdAt) as monthName,
        YEAR(oi.createdAt) as year,
        MONTH(oi.createdAt) as month
      FROM order_items oi
      JOIN foods f ON oi.food_id = f.id
      GROUP BY f.id, year, month
      ORDER BY year ASC, month ASC, totalQuantity DESC
    `);

    return result;
  } catch (error) {
    console.error("Error fetching monthly most sold food items:", error);
  }
};

// api for getting most sell
const getMostSoldItems = async (req, res) => {
  try {
    const monthlySoldItems = await getMonthlyMostSoldFoodItems();
    if (!monthlySoldItems || monthlySoldItems.length === 0) {
      res.status(404).send({ msg: "No data found" });
    } else {
      res.status(200).send(monthlySoldItems);
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// api for total sales year wise
const totalSalesYearly = async (req, res) => {
  try {
    const salesReport = await orderRepository
      .createQueryBuilder("order")
      .select("YEAR(order.createdAt)", "year")
      .addSelect("SUM(order.grand_total)", "totalSales")
      .where("order.status = :status", { status: "closed" })
      .groupBy("year")
      .orderBy("year", "ASC")
      .getRawMany();

    if (!salesReport || salesReport.length === 0) {
      return res.status(404).send({ msg: "No data found" });
    }
    res.status(200).send(salesReport);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// api for total sales month wise
const totalSalesMonthly = async (req, res) => {
  try {
    const salesReport = await orderRepository
      .createQueryBuilder("order")
      .select("MONTHNAME(order.createdAt)", "month")
      .addSelect("MONTH(order.createdAt)", "monthNum")
      .addSelect("SUM(order.grand_total)", "totalSales")
      .where("order.status = :status", { status: "closed" })
      .groupBy("monthNum, month")
      .orderBy("monthNum", "ASC")
      .getRawMany();

    if (!salesReport || salesReport.length === 0) {
      return res.status(404).send({ msg: "No data found" });
    }
    res.status(200).send(salesReport);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// api for user wise sales
const userWiseSales = async (req, res) => {
  try {
    const userSalesReport = await orderRepository
      .createQueryBuilder("order")
      .leftJoin("order.user", "user")
      .select("user.name", "userName")
      .addSelect("SUM(order.grand_total)", "totalSales")
      .where("order.status = :status", { status: "closed" })
      .groupBy("user.id")
      .orderBy("totalSales", "DESC")
      .getRawMany();

    if (!userSalesReport || userSalesReport.length === 0) {
      return res.status(404).send({ msg: "No data Found" });
    }
    res.status(200).send(userSalesReport);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  getMostSoldItems,
  totalSalesMonthly,
  totalSalesYearly,
  userWiseSales,
};

module.exports = {
  getMostSoldItems,
  totalSalesMonthly,
  totalSalesYearly,
  userWiseSales,
};
