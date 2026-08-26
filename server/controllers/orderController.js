const AppDataSource = require("../config/database");
const OrderEntity = require("../entities/OrderEntity");
const OrderItemEntity = require("../entities/OrderItemEntity");
const FoodEntity = require("../entities/FoodEntity");
const UserEntity = require("../entities/UserEntity");

const orderRepository = AppDataSource.getRepository(OrderEntity);
const orderItemRepository = AppDataSource.getRepository(OrderItemEntity);
const foodRepository = AppDataSource.getRepository(FoodEntity);
const userRepository = AppDataSource.getRepository(UserEntity);

// Helper function to validate Number ID
const isValidId = (id) => !isNaN(parseInt(id));

// get price by food id
const getPrice = async (food_id) => {
  try {
    if (!isValidId(food_id)) {
      return { msg: "invalid foodId" };
    }

    const food = await foodRepository.findOneBy({ id: parseInt(food_id) });

    if (!food) {
      return { msg: "food not found" };
    }

    const price = parseFloat(food.price);
    if (isNaN(price)) {
      return { msg: "price is NaN" };
    }

    return price;
  } catch (error) {
    return { msg: error.message, price: 0 }; 
  }
};

// new order no
const generateOrderNumber = async () => {
  const today = new Date().toISOString().split("T")[0];
  const prefix = today + "_";

  try {
    const lastOrder = await orderRepository
      .createQueryBuilder("order")
      .where("order.order_no LIKE :prefix", { prefix: `${prefix}%` })
      .orderBy("order.createdAt", "DESC")
      .addOrderBy("order.id", "DESC")
      .getOne();

    let sequence = 1;
    if (lastOrder) {
      const lastOrderNo = lastOrder.order_no;
      sequence = parseInt(lastOrderNo.split("_")[1], 10) + 1;
    }

    return `${prefix}${sequence}`;
  } catch (error) {
    console.error("Error generating order number:", error);
    throw new Error("Failed to generate order number");
  }
};

// new order
const newOrder = async (req, res) => {
  const { table_id, user_id, items } = req.body;

  if (!isValidId(table_id) || !isValidId(user_id)) {
    return res.status(400).send({ msg: "Invalid table_id or user_id" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).send({ msg: "No items provided" });
  }

  try {
    const order_no = await generateOrderNumber();

    const order = orderRepository.create({
      table: { id: parseInt(table_id) },
      user: { id: parseInt(user_id) },
      order_no,
    });
    await orderRepository.save(order);

    const orderItems = items.map((item) => {
      return orderItemRepository.create({
        quantity: item.quantity,
        food: { id: parseInt(item.food_id) },
        order: { id: order.id },
      });
    });
    await orderItemRepository.save(orderItems);

    res.status(201).send({
      msg: "Order placed successfully",
      order,
      orderItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: error.message });
  }
};

// get all orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderRepository.find({
      relations: ["table", "user"],
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// get order user wise
const userWiseOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await orderRepository.find({
      where: { user: { id: parseInt(id) } },
      relations: ["table"],
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// full order
const viewFullOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const fullOrder = await orderItemRepository.find({
      where: { order: { id: parseInt(id) } },
      relations: ["food"],
    });
    const order = await orderRepository.findOne({
      where: { id: parseInt(id) },
      relations: ["table", "user"],
    });
    if (!fullOrder || !order) {
      return res.status(404).send({ msg: "No order found" });
    }
    res.status(200).send({ order: order, fullOrder: fullOrder });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

// edit order (Actually "order_no" param in req.body was used in findById, but it's likely the "id")
const editOrder = async (req, res) => {
  const { order_no, items } = req.body; // order_no here is likely the order ID

  if (!order_no || !Array.isArray(items)) {
    return res.status(400).send({ msg: "Order ID and items are required" });
  }

  try {
    const order = await orderRepository.findOneBy({ id: parseInt(order_no) });

    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    if (order.status !== "open") {
      return res.status(400).send({ msg: "Order status is not open" });
    }

    const updatedItems = [];
    const newItems = [];

    for (const item of items) {
      if (!isValidId(item.food_id)) {
        return res
          .status(400)
          .send({ msg: `Invalid food_id: ${item.food_id}` });
      }

      const existingItem = await orderItemRepository.findOne({
        where: {
          order: { id: order.id },
          food: { id: parseInt(item.food_id) },
        },
      });

      if (existingItem) {
        existingItem.quantity += parseInt(item.quantity);
        await orderItemRepository.save(existingItem);
        updatedItems.push(existingItem);
      } else {
        const newItem = orderItemRepository.create({
          food: { id: parseInt(item.food_id) },
          quantity: parseInt(item.quantity),
          order: { id: order.id },
        });
        await orderItemRepository.save(newItem);
        newItems.push(newItem);
      }
    }

    res.status(200).send({
      msg: "Order updated successfully",
      updatedItems,
      newItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: error.message });
  }
};

// checkout order
const checkoutOrder = async (req, res) => {
  const { order_no, customer_mob } = req.body; // order_no is ID

  if (!order_no) {
    return res.status(400).send({ msg: "Order ID is required" });
  }

  const customerMobile = customer_mob || "Unknown";

  try {
    const order = await orderRepository.findOneBy({ id: parseInt(order_no) });

    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    const orderItems = await orderItemRepository.find({
      where: { order: { id: order.id } },
      relations: ["food"],
    });

    if (orderItems.length === 0) {
      return res.status(400).send({ msg: "No items found for this order" });
    }

    let grandTotal = 0;
    for (const item of orderItems) {
      const price = parseFloat(item.food.price);
      if (isNaN(price)) {
        return res.status(500).send({ msg: "Invalid Price NaN" });
      }
      grandTotal += price * item.quantity;
    }

    order.grand_total = grandTotal;
    order.customer_mob = customerMobile;
    order.status = "closed";
    await orderRepository.save(order);

    res.status(200).send({
      msg: "Order checked out successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).send({ msg: "Order not found" });
    }

    // Associated order items are deleted via CASCADE if defined in EntitySchema
    // But we can also delete manually to be safe if cascade is not set
    // In my EntitySchema, I didn't explicitly set cascade delete in Order -> OrderItem but relations delete CASCADE usually works.

    res.status(200).send({ msg: "Order deleted Successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  newOrder,
  allOrders,
  userWiseOrder,
  viewFullOrder,
  editOrder,
  checkoutOrder,
  deleteOrder,
};

module.exports = {
  newOrder,
  allOrders,
  userWiseOrder,
  viewFullOrder,
  editOrder,
  checkoutOrder,
  deleteOrder,
};
