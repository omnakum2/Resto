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
      type: "enum",
      enum: ["active", "deactive"],
      enumName: "category_status_enum",
      default: "active",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    foods: {
      target: "Food",
      type: "one-to-many",
      inverseSide: "category",
    },
  },
});
