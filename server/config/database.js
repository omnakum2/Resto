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
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT) || 5432,
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "",
  database: process.env.PG_DATABASE || "resto_db",
  synchronize: isLocal, // Auto-create tables (use only in dev)
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
