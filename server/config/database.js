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

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  database: process.env.DB_NAME,
  synchronize: true,
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
