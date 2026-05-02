const { DataSource } = require("typeorm");
const UserEntity = require("../entities/UserEntity");
const CategoryEntity = require("../entities/CategoryEntity");
const FoodEntity = require("../entities/FoodEntity");
const TableEntity = require("../entities/TableEntity");
const OrderEntity = require("../entities/OrderEntity");
const OrderItemEntity = require("../entities/OrderItemEntity");
const UserProfileEntity = require("../entities/UserProfileEntity");
const dotenv = require("dotenv");

dotenv.config();

const isLocal = process.env.NODE_ENV === "local";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "resto_db",
  synchronize: isLocal, // Auto-create tables (use only in dev)
  logging: false,
  entities: [
    UserEntity,
    CategoryEntity,
    FoodEntity,
    TableEntity,
    OrderEntity,
    OrderItemEntity,
    UserProfileEntity,
  ],
});

module.exports = AppDataSource;
