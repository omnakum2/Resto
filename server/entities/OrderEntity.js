const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  target: "Order",
  tableName: "orders",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    order_no: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    customer_mob: {
      type: "varchar",
      nullable: true,
    },
    status: {
      type: "varchar",
      default: "open",
    },
    grand_total: {
      type: "decimal",
      precision: 10,
      scale: 2,
      default: 0.0,
    }
  },
  relations: {
    table: {
      target: "Table",
      type: "many-to-one",
      joinColumn: { name: "table_id" },
      onDelete: "SET NULL",
    },
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "SET NULL",
    },
    items: {
      target: "OrderItem",
      type: "one-to-many",
      inverseSide: "order",
      cascade: true,
    },
  },
});
