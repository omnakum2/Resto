const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Food",
  target: "Food",
  tableName: "foods",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
      default: 0.0,
    },
    description: {
      type: "text",
      nullable: true,
    },
    status: {
      type: "varchar",
      default: "active",
    },
    flag: {
      type: "varchar",
      default: "special",
    },
    image: {
      type: "varchar",
      nullable: true,
    }
  },
  relations: {
    category: {
      target: "Category",
      type: "many-to-one",
      joinColumn: { name: "category_id" },
      onDelete: "CASCADE",
    },
    orderItems: {
        target: "OrderItem",
        type: "one-to-many",
        inverseSide: "food"
    }
  },
});
