const Table = require("../modals/TableModel");

// fetch all tables
const getTables = async (req, res) => {
  try {
    const table = await Table.find({});
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// fetch one table
const getTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id);
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// insert table
const addTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update table
const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findByIdAndUpdate(id, req.body);

    if (!table) {
      return res.status(404).json({ msg: "Table not found" });
    }

    const updateTable = await Table.findById(id);
    res.status(200).json(updateTable);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete tables
const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findByIdAndDelete(id);

    if (!table) {
      res.status(404).json({ msg: "product not found" });
    }

    res.status(200).send({msg:"Table deleted successfully..."});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getTables,
  getTable,
  addTable,
  updateTable,
  deleteTable,
};
