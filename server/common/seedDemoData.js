// Seeding Script
import UserEntity from "../entities/UserEntity.js";
import CategoryEntity from "../entities/CategoryEntity.js";
import AppDataSource from "../config/database.js";
import bcrypt from "bcryptjs";
const userRepository = AppDataSource.getRepository(UserEntity);
const categoryRepository = AppDataSource.getRepository(CategoryEntity);

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
            const cat = categoryRepository.create({
                name: "Main Course",
                status: "active"
            });
            await categoryRepository.save(cat);
            console.log("Seeded default Category: Main Course");
        }
    }
}