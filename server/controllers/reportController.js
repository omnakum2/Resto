const OrderItem = require("../modals/OrderItemModel");
const Order = require("../modals/OrderModel");
const User = require("../modals/UserModel");

const getMonthlyMostSoldFoodItems = async () => {
  try {
    const monthlySoldItems = await OrderItem.aggregate([
      {
        $project: {
          food_id: 1,
          quantity: 1,
          year: { $year: "$createdAt" }, // Extract year from createdAt
          month: { $month: "$createdAt" }, // Extract month from createdAt
        },
      },
      {
        $group: {
          _id: { food_id: "$food_id", year: "$year", month: "$month" }, // Group by food_id, year, and month
          totalQuantity: { $sum: "$quantity" }, // Calculate total quantity sold
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, totalQuantity: -1 }, // Sort by year, month, and totalQuantity
      },
      {
        $lookup: {
          from: "foods", // Collection to join with
          localField: "_id.food_id",
          foreignField: "_id",
          as: "food_item",
        },
      },
      {
        $unwind: "$food_item", // Unwind the array to get the food item details
      },
      {
        $project: {
          _id: 0,
          food_name: "$food_item.name",
          totalQuantity: 1,
          monthName: {
            $arrayElemAt: [
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              { $subtract: ["$_id.month", 1] },
            ],
          },
        },
      },
    ]);

    return monthlySoldItems;
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
    // Aggregate data
    const salesReport = await Order.aggregate([
      { $match: { status: "closed" } }, // Filter closed orders
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // Group by year
          },
          totalSales: { $sum: "$grand_total" },
        },
      },
      { $sort: { "_id.year": 1 } }, // Optional: sort by year
    ]);

    const formattedReport = salesReport.map((record) => ({
      year: record._id.year,
      totalSales: record.totalSales,
    }));

    if (!formattedReport) {
      res.status(404).send({ msg: "No data found" });
    }
    res.status(200).send(formattedReport);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// api for total sales month wise
const totalSalesMonthly = async (req, res) => {
  try {
    // Aggregate data
    const salesReport = await Order.aggregate([
      { $match: { status: "closed" } }, // Filter closed orders
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Group by month
          },
          totalSales: { $sum: "$grand_total" },
        },
      },
      { $sort: { "_id.month": 1 } }, // Optional: sort by year and month
    ]);

    // Convert month numbers to month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedReport = salesReport.map((record) => ({
      month: monthNames[record._id.month - 1], // Adjust month index (0-based)
      totalSales: record.totalSales,
    }));

    if (!formattedReport) {
      res.status(404).send({ msg: "No data found" });
    }
    res.status(200).send(formattedReport);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// api for total sales month wise
const userWiseSales = async (req, res) => {
  try {
    const userSalesReport = await Order.aggregate([
      { $match: { status: "closed" } }, // Filter closed orders
      {
        $group: {
          _id: "$user_id", // Group by user_id
          totalSales: { $sum: "$grand_total" },
        },
      },
      {
        $lookup: {
          from: "users", // Collection name of your User model
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" }, // Flatten the userDetails array
      {
        $project: {
          _id: 0, // Exclude _id from the final result
        //   userId: "$_id",
          userName: "$userDetails.name",
          totalSales: 1,
        },
      },
      { $sort: { totalSales: -1 } }, // Optional: sort by total sales
    ]);
    if(!userSalesReport){
        res.status(404).send({msg:"No data Found"})
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
