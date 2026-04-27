const AppDataSource = require("../config/database");
const CategoryEntity = require("../entities/CategoryEntity");

const categoryRepository = AppDataSource.getRepository(CategoryEntity);

// fetch all category
const getCategories = async (req, res) => {
  try {
    const category = await categoryRepository.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// fetch one category
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryRepository.findOneBy({ id: parseInt(id) });
    if (!category) return res.status(404).json({ msg: "Category not found" });
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
      return res.status(400).send({ msg: "All fields are Required" });
    }

    // check category already exist - name
    const existcategory = await categoryRepository.findOneBy({ name });
    if (existcategory) {
      return res.status(409).send({ msg: `${name} category already exists` });
    }

    const category = categoryRepository.create(req.body);
    await categoryRepository.save(category);
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
      return res.status(400).send({ msg: "All fields are Required" });
    }

    // check category already exist - name (excluding current category)
    const existcategory = await categoryRepository.findOneBy({ name });
    if (existcategory && existcategory.id !== parseInt(id)) {
      return res.status(409).send({ msg: `${name} category already exists` });
    }

    let category = await categoryRepository.findOneBy({ id: parseInt(id) });

    if (!category) {
      return res.status(404).send({ msg: "Category not found" });
    }

    categoryRepository.merge(category, req.body);
    const updatedCategory = await categoryRepository.save(category);
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete category
const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryRepository.delete(id);

    if (result.affected === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).send({ msg: "category deleted successfully..." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

    const category = await categoryRepository.findOneBy({ id: parseInt(id) });

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    category.status = status;
    await categoryRepository.save(category);

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getActiveCategories = async (req, res) => {
  try {
    const activeCategories = await categoryRepository.findBy({ status: "active" });

    if (activeCategories.length === 0) {
      return res.status(404).json({ msg: "No active categories found" });
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
