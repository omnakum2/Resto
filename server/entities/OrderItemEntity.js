const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "OrderItem",
  target: "OrderItem",
  tableName: "order_items",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    quantity: {
      type: "int",
      default: 1,
    },
    createdAt: {
      type: "datetime",
      createDate: true,
    },
    updatedAt: {
      type: "datetime",
      updateDate: true,
    },
  },
  relations: {
    food: {
      target: "Food",
      type: "many-to-one",
      joinColumn: { name: "food_id" },
      onDelete: "CASCADE",
    },
    order: {
      target: "Order",
      type: "many-to-one",
      joinColumn: { name: "order_id" },
      onDelete: "CASCADE",
    },
  },
});
