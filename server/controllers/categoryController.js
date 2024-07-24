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
    const category = await Category.findByIdAndUpdate(id, req.body);

    if (!category) {
      return res.status(404).json({ msg: "product not found" });
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
      return res.status(404).json({ msg: "product not found" });
    }

    res.status(200).send({ msg: "category deleted successfully..." });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategories,
  updateCategories,
  deleteCategories,
};
