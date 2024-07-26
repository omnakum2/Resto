const Food = require("../modals/FoodModel");
const Category = require("../modals/CategoryModel");

// fetch all foods
const getFoods = async (req, res) => {
  try {
    const food = await Food.find({});
    res.status(200).json(food);
  } catch (error) {
    res.status(500).send(error);
  }
};

// fetch single food
const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).send(error);
  }
};

// add food
const addFood = async (req, res) => {
  try {
    const { name, price, description, category_id } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    if (!(name && price && description && category_id)) {
      return res.status(400).send("All fields are Required");
    }

    // check category if exists - id
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(400).send("Invalid Category");
    }

    // check food already exist - name
    const existFood = await Food.findOne({ name });
    if (existFood) {
      return res.status(409).send(`Food already exists with ${name} name`);
    }
    const newFood = await Food.create({
      name,
      price,
      description,
      category_id,
      image: image,
    });

    // full image URL
    if (newFood.image) {
        newFood.image = `http://localhost:3001/${newFood.image}`;
      }

    res.status(201).send(newFood);
  } catch (error) {
    res.status(500).send(error);
  }
};

// update food
const updateFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    const image = req.file ? req.file.path : null;

    // check food exist - id
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).send("Food item not found");
    }

    // Validate the category
    if (category_id) {
      const category = await Category.findById(category_id);
      if (!category) {
        return res.status(400).send("Invalid Category");
      }
    }

    const updateFood = await Food.findByIdAndUpdate(
      id,
      {
        name: name || food.name,
        price: price || food.price,
        description: description || food.description,
        category_id: category_id || food.category_id,
        image: image || food.image,
      },
      { new: true }
    );

    res.status(200).send(updateFood);
  } catch (error) {
    res.status(500).send(error);
  }
};

// delete food
const deleteFood = async (req, res) => {
  try {
    const deleteFood = await Food.findByIdAndDelete(req.params.id);
    if (!deleteFood) {
      res.status(404).send("Food not found");
    }
    res.status(200).send("Food delete Successfully");
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
};
