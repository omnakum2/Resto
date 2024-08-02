const Food = require("../modals/FoodModel");
const Category = require("../modals/CategoryModel");
const fs = require('fs');

// fetch all foods
const getFoods = async (req, res) => {
  try {
    // const food = await Food.find({});
    const food = await Food.find({})
      .populate('category_id', 'name') // Populate the category field, only including the 'name' field
      .exec();
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// fetch single food
const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// add food
const addFood = async (req, res) => {
  try {
    const { name, price, description, category_id } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    if (!(name && price && description && category_id)) {
      return res.status(400).send({msg:"All fields are Required"});
    }

    // check category if exists - id
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(400).send({msg:"Invalid Category"});
    }

    // check food already exist - name
    const existFood = await Food.findOne({ name });
    if (existFood) {
      return res.status(409).send({msg:`Food already exists with ${name} name`});
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

    res.status(200).send(newFood);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// update food
const updateFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    const image = req.file ? req.file.path : null;

    if (!(name && price && description && category_id)) {
      return res.status(400).send("All fields are Required");
    }

    // check food already exist - name
    const existFood = await Food.findOne({ name });
    if (existFood) {
      return res.status(409).send(`Food already exists with ${name} name`);
    }

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

    // Delete the image file if it exists
    if (deleteFood.image) {
      const imagePath = path.join(__dirname, '../uploads', deleteFood.image); // Adjust path as necessary
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
          // You can choose to proceed or handle this error as per your requirement
        }
      });
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
