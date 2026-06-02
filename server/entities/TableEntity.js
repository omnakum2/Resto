const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Table",
  target: "Table",
  tableName: "tables",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    table_no: {
      type: "int",
      unique: true,
      nullable: false,
    },
    status: {
      type: "varchar",
      default: "unoccupied",
    },
    size: {
      type: "int",
      default: 4,
    },
    type: {
      type: "varchar",
      nullable: true,
    }
  },
  relations: {
    orders: {
      target: "Order",
      type: "one-to-many",
      inverseSide: "table",
    },
  },
});
