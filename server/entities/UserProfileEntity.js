const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "UserProfile",
  target: "UserProfile",
  tableName: "user_profiles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    address: {
      type: "varchar",
      nullable: true,
    },
    mobile: {
      type: "varchar",
      nullable: true,
    },
    image: {
      type: "varchar",
      nullable: true,
    },
    gender: {
      type: "varchar",
      nullable: true,
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
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: { name: "user_id" },
      cascade: true,
      onDelete: "CASCADE",
    },
  },
});
