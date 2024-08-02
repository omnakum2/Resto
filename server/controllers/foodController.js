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
    const image = req.file ? req.file.filename : null;

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
  try {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    const newImage = req.file ? req.file.filename : null;

    // check food exist - id
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).send({msg:"Food item not found"});
    }

    if (!(name && price && description && category_id)) {
      return res.status(400).send({msg:"All fields are Required"});
    }

    // Validate the category
    if (category_id) {
      const category = await Category.findById(category_id);
      if (!category) {
        return res.status(400).send({msg:"Invalid Category"});
      }
    }

    // If a new image is provided, delete the old image
    if (newImage) {
      if (food.image) {
        const oldImagePath = path.join('uploads', food.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
    }

    const updateFood = await Food.findByIdAndUpdate(
      id,
      {
        name: name || food.name,
        price: price || food.price,
        description: description || food.description,
        category_id: category_id || food.category_id,
        image: newImage || food.image,
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
    const id = req.params.id;
    const food = await Food.findById(id);
    // console.log(id);

    // Delete the image file if it exists
    // if (food.image) {
    //   const dir = 'uploads';
    //   const filename = food.image;
    //   // console.log(dir+filename);
    //   const imagePath = path.join(__dirname, dir, filename);
    //   console.log(imagePath);
    //   console.log("found.....");
    //   // fs.unlink(imagePath, (err) => {
    //   //   if (err) {
    //   //     alert(err);
    //   //   }
    //   // });
    // }
    if (food.image) {
      const oldImagePath = path.join('uploads', food.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // const deleteFood = await Food.findByIdAndDelete(id);
    // if (!deleteFood) {
    //   res.status(404).send("Food not found");
    // }

    res.status(200).send("Food delete Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

// update status
const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Get the new status from the request body

    // Validate the status value
    if (!status || (status !== 'active' && status !== 'deactive')) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    // Find the category by ID and update its status
    const food = await Food.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!food) {
      return res.status(404).json({ msg: 'Food not found' });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}

module.exports = {
  getFoods,
  getFood,
  addFood,
  updateFood,
  deleteFood,
  toggleStatus,
};
