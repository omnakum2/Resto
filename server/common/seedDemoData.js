// Seeding Script
import UserEntity from "../entities/UserEntity.js";
import CategoryEntity from "../entities/CategoryEntity.js";
import FoodEntity from "../entities/FoodEntity.js";
import TableEntity from "../entities/TableEntity.js";
import OrderEntity from "../entities/OrderEntity.js";
import OrderItemEntity from "../entities/OrderItemEntity.js";
import UserProfileEntity from "../entities/UserProfileEntity.js";
import AppDataSource from "../config/database.js";
import bcrypt from "bcryptjs";
const userRepository = AppDataSource.getRepository(UserEntity);
const categoryRepository = AppDataSource.getRepository(CategoryEntity);
const foodRepository = AppDataSource.getRepository(FoodEntity);
const tableRepository = AppDataSource.getRepository(TableEntity);
const orderRepository = AppDataSource.getRepository(OrderEntity);
const orderItemRepository = AppDataSource.getRepository(OrderItemEntity);
const userProfileRepository = AppDataSource.getRepository(UserProfileEntity);

export const seedDemoData = async () => {
    const userCount = await userRepository.count();
    if (userCount === 0) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
        const adminUser = userRepository.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            status: "active",
            role: "admin",
        });
        await userRepository.save(adminUser);
        
        const categoryCount = await categoryRepository.count();
        if (categoryCount === 0) {
            const categories = {};

            for (const categoryName of ['Chinese', 'North Indian', 'South Indian']) {
                const cat = categoryRepository.create({
                    name: categoryName,
                    status: "active",
                });

                await categoryRepository.save(cat);
                categories[categoryName] = cat;
            }
            console.log("Seeded default Categories");

            const foodCount = await foodRepository.count();

            if (foodCount === 0) {
                const foods = [
                    {
                        name: "Manchurian",
                        price: 150,
                        description: "Deep fried vegetable balls tossed in a spicy, tangy sauce",
                        image: "manchurian.png",
                        status: "active",
                        category: categories["Chinese"],
                    },
                    {
                        name: "Chinese Bhel",
                        price: 120,
                        description: "Crispy noodles tossed in a spicy, tangy sauce",
                        image: "chinese-bhel.jpg",
                        status: "active",
                        category: categories["Chinese"],
                    },
                    {
                        name: "Dal Fry",
                        price: 200,
                        description: "Yellow lentils tempered with spices and herbs",
                        image: "dal-fry.jpg",
                        status: "active",
                        category: categories["North Indian"],
                    },
                    {
                        name: "Jeera Rice",
                        price: 200,
                        description: "Rice tempered with cumin seeds",
                        image: "rice.jpg",
                        status: "active",
                        category: categories["North Indian"],
                    },
                    {
                        name: "Masala Dosa",
                        price: 120,
                        description: "Crispy crepe filled with spiced potatoes",
                        image: "dosa.jpg",
                        status: "active",
                        category: categories["South Indian"],
                    },
                    {
                        name: "Idli",
                        price: 150,
                        description: "Steamed rice cakes served with sambar and chutney",
                        image: "idli.jpg",
                        status: "active",
                        category: categories["South Indian"],
                    },
                ];

                for (const food of foods) {
                    await foodRepository.save(foodRepository.create(food));
                }

                console.log("Seeded default Foods");
            }
        }

        const tableCount = await tableRepository.count();
        if (tableCount === 0) {
            const tables = [
                {
                    table_no: 1,
                    status: "occupied",
                    size: 4,
                    type: "Non AC"
                },
                {
                    table_no: 2,
                    size: 4,
                    type: "Non AC"
                },
                {
                    table_no: 3,
                    status: "occupied",
                    size: 2,
                    type: "AC"
                },
                {
                    table_no: 4,
                    size: 2,
                    type: "AC"
                }
            ];

            for (const table of tables) {
                await tableRepository.save(tableRepository.create(table));
            }
            console.log("Seeded default Tables");
        }

        // Seed a master staff user (Suresh) with a profile
        let sureshUser = await userRepository.findOneBy({
            email: "suresh@foodcourt.com",
        });
        if (!sureshUser) {
            const staffPassword = await bcrypt.hash(
                process.env.STAFF_PASS || process.env.ADMIN_PASS,
                10
            );
            sureshUser = userRepository.create({
                name: "Suresh",
                email: "suresh@foodcourt.com",
                password: staffPassword,
                status: "active",
                role: "staff",
            });
            await userRepository.save(sureshUser);

            const sureshProfile = userProfileRepository.create({
                address: "12, MG Road, Ahmedabad",
                mobile: "9825011111",
                gender: "male",
                image: null,
                user: sureshUser,
            });
            await userProfileRepository.save(sureshProfile);
            console.log("Seeded master staff user Suresh");
        }

        // Seed a couple of completed bills (closed orders) placed by Suresh
        const orderCount = await orderRepository.count();
        if (orderCount === 0) {
            // Re-fetch persisted foods/tables so bills reference real rows
            const allFoods = await foodRepository.find();
            const foodByName = Object.fromEntries(
                allFoods.map((f) => [f.name, f])
            );
            const allTables = await tableRepository.find();
            const tableByNo = Object.fromEntries(
                allTables.map((t) => [t.table_no, t])
            );

            const today = new Date().toISOString().split("T")[0];

            // Two orders by Suresh, each using different foods across categories:
            // one completed bill (closed) and one in-progress order (open).
            const orders = [
                {
                    order_no: `${today}_1`,
                    status: "closed", // billed & paid -> table freed
                    customer_mob: "9876543210",
                    table_no: 2,
                    items: [
                        { name: "Manchurian", quantity: 2 }, // Chinese
                        { name: "Dal Fry", quantity: 1 }, // North Indian
                        { name: "Masala Dosa", quantity: 1 }, // South Indian
                    ],
                },
                {
                    order_no: `${today}_2`,
                    status: "open", // still dining -> occupied table, no bill yet
                    customer_mob: null,
                    table_no: 3,
                    items: [
                        { name: "Chinese Bhel", quantity: 1 }, // Chinese
                        { name: "Jeera Rice", quantity: 2 }, // North Indian
                        { name: "Idli", quantity: 1 }, // South Indian
                    ],
                },
            ];

            const requiredFoods = orders.flatMap((o) =>
                o.items.map((i) => i.name)
            );
            const hasAllFoods = requiredFoods.every((n) => foodByName[n]);

            if (sureshUser && hasAllFoods) {
                for (const ord of orders) {
                    // grand_total is only set once an order is checked out (closed)
                    const grandTotal =
                        ord.status === "closed"
                            ? ord.items.reduce(
                                  (sum, it) =>
                                      sum +
                                      parseFloat(foodByName[it.name].price) *
                                          it.quantity,
                                  0
                              )
                            : 0;

                    const order = orderRepository.create({
                        order_no: ord.order_no,
                        customer_mob: ord.customer_mob,
                        status: ord.status,
                        grand_total: grandTotal,
                        user: sureshUser,
                        table: tableByNo[ord.table_no] || null,
                    });
                    await orderRepository.save(order);

                    const orderItems = ord.items.map((it) =>
                        orderItemRepository.create({
                            quantity: it.quantity,
                            food: foodByName[it.name],
                            order: { id: order.id },
                        })
                    );
                    await orderItemRepository.save(orderItems);
                }
                console.log(
                    "Seeded demo orders for staff Suresh (1 closed bill, 1 open)"
                );
            } else {
                console.log(
                    "Skipped order seeding: missing Suresh user or required foods"
                );
            }
        }
    }
}