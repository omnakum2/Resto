const Category = require("../modals/CategoryModel");

// fetch all category
const getCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// fetch one category
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// insert category
const addCategories = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({msg:"All fields are Required"});
    }

    // check category already exist - name
    const existcategory = await Category.findOne({ name });
    if (existcategory) {
      return res.status(409).send({msg:`${name} category already exists`});
    }

    const category = await Category.create(req.body);
    res.status(200).send(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update category
const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({msg:"All fields are Required"});
    }

    // check category already exist - name
    const existcategory = await Category.findOne({ name });
    if (existcategory) {
      return res.status(409).send({msg:`${name} category already exists`});
    }

    const category = await Category.findByIdAndUpdate(id, req.body);

    if (!category) {
      return res.status(404).send({ msg: "Category not found" });
    }

    const updateCategory = await Category.findById(id);
    res.status(200).send(updateCategory);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete category
const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ msg: "Categoryct not found" });
    }

    res.status(200).send({ msg: "category deleted successfully..." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update status
const toggleStatus = async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const category = await Category.findById(id);

  //   if (!category) {
  //     return res.status(404).json({ msg: "Category not found" });
  //   }
    
  // } catch (error) {
  //   res.status(500).json({ msg: error.message });
  // }

  try {
    const { id } = req.params;
    const { status } = req.body; // Get the new status from the request body

    // Validate the status value
    if (!status || (status !== 'active' && status !== 'deactive')) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    // Find the category by ID and update its status
    const category = await Category.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}

const getActiveCategories = async (req, res) => {
  try {
    // Fetch categories with status 'active'
    const activeCategories = await Category.find({ status: "active" });
    
    // Check if there are no categories found
    if (!activeCategories) {
      return res.status(404).json({ msg: 'No active categories found' });
    }
    
    res.status(200).json(activeCategories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategories,
  updateCategories,
  deleteCategories,
  toggleStatus,
  getActiveCategories,
};
