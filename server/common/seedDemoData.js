// Seeding Script
import UserEntity from "../entities/UserEntity.js";
import CategoryEntity from "../entities/CategoryEntity.js";
import FoodEntity from "../entities/FoodEntity.js";
import TableEntity from "../entities/TableEntity.js";
import AppDataSource from "../config/database.js";
import bcrypt from "bcryptjs";
const userRepository = AppDataSource.getRepository(UserEntity);
const categoryRepository = AppDataSource.getRepository(CategoryEntity);
const foodRepository = AppDataSource.getRepository(FoodEntity);
const tableRepository = AppDataSource.getRepository(TableEntity);

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
    }
}