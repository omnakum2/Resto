const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  target: "User",
  tableName: "users",
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
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    status: {
      type: "enum",
      enum: ["active", "deactive"],
      enumName: "user_status_enum",
      default: "deactive",
    },
    role: {
      type: "enum",
      enum: ["staff", "admin"],
      enumName: "user_role_enum",
      default: "staff",
    },
    otp: {
      type: "varchar",
      nullable: true,
      default: null,
    },
    otpExpire: {
      type: "bigint",
      nullable: true,
      transformer: {
        to: (value) => (value instanceof Date ? value.getTime() : value),
        from: (value) => (value ? new Date(parseInt(value)) : null),
      },
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
});
