const AppDataSource = require("../config/database");
const FoodEntity = require("../entities/FoodEntity");
const CategoryEntity = require("../entities/CategoryEntity");
const fs = require("fs");
const path = require("path");

const foodRepository = AppDataSource.getRepository(FoodEntity);
const categoryRepository = AppDataSource.getRepository(CategoryEntity);

// fetch all foods
const getFoods = async (req, res) => {
  try {
    const food = await foodRepository.find({
      relations: ["category"],
    });
    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// fetch single food
const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ["category"]
    });
    if (!food) return res.status(404).json({ msg: "Food item not found" });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// add food
const addFood = async (req, res) => {
  try {
    const { name, price, description, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!(name && price && description && category_id)) {
      return res.status(400).send({ msg: "All fields are Required" });
    }

    // check category if exists - id
    const category = await categoryRepository.findOneBy({ id: parseInt(category_id) });
    if (!category) {
      return res.status(400).send({ msg: "Invalid Category" });
    }

    // check food already exist - name
    const existFood = await foodRepository.findOneBy({ name });
    if (existFood) {
      return res
        .status(409)
        .send({ msg: `Food already exists with ${name} name` });
    }
    const newFood = foodRepository.create({
      name,
      price: parseFloat(price),
      description,
      category: category,
      image: image,
    });
    await foodRepository.save(newFood);

    // full image path handling is handled by frontend BASE_URL
    res.status(200).send(newFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// update food
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    const newImage = req.file ? req.file.filename : null;

    // check food exist - id
    const food = await foodRepository.findOneBy({ id: parseInt(id) });
    if (!food) {
      return res.status(404).send({ msg: "Food item not found" });
    }

    if (!(name && price && description && category_id)) {
      return res.status(400).send({ msg: "All fields are Required" });
    }

    // Validate the category
    let category = null;
    if (category_id) {
      category = await categoryRepository.findOneBy({ id: parseInt(category_id) });
      if (!category) {
        return res.status(400).send({ msg: "Invalid Category" });
      }
    }

    // If a new image is provided, delete the old image
    if (newImage) {
      if (food.image) {
        const oldImagePath = path.join(__dirname, "../uploads", food.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
    }

    foodRepository.merge(food, {
      name: name || food.name,
      price: price ? parseFloat(price) : food.price,
      description: description || food.description,
      category: category || food.category,
      image: newImage || food.image,
    });

    const updatedFood = await foodRepository.save(food);
    res.status(200).send(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// delete food
const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    const food = await foodRepository.findOneBy({ id: parseInt(id) });
    
    if (!food) {
      return res.status(404).send("Food not found");
    }

    if (food.image) {
      const filepath = path.join(__dirname, "../uploads", food.image)
      fs.unlink(filepath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    await foodRepository.delete(id);
    res.status(200).send("Food delete Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

// update status
const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    if (!status || (status !== "active" && status !== "deactive")) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const food = await foodRepository.findOneBy({ id: parseInt(id) });

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }

    food.status = status;
    await foodRepository.save(food);

    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// special food 
const toggleSpecial = async (req, res) => {
  try {
    const { id } = req.params;
    const { flag } = req.body; 

    if (!flag || (flag !== "special" && flag !== "none")) {
      return res.status(400).json({ msg: "Invalid flag value" });
    }

    const food = await foodRepository.findOneBy({ id: parseInt(id) });

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }

    food.flag = flag;
    await foodRepository.save(food);

    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// for client
const byCategory = async (req, res) => {
  try {
    const id = req.params.category_id;
    const foodByCategory = await foodRepository.find({
      where: {
        category: { id: parseInt(id) },
        status: "active",
      },
      relations: ["category"],
    });
    res.send(foodByCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getFoods,
  getFood,
  addFood,
  updateFood,
  deleteFood,
  toggleStatus,
  toggleSpecial,
  byCategory,
};

module.exports = {
  getFoods,
  getFood,
  addFood,
  updateFood,
  deleteFood,
  toggleStatus,
  toggleSpecial,
  byCategory,
};
