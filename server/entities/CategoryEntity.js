const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Category",
  target: "Category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    status: {
      type: "varchar",
      default: "active",
    }
  },
  relations: {
    foods: {
      target: "Food",
      type: "one-to-many",
      inverseSide: "category",
    },
  },
});
