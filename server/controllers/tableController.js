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
    const { table_no, size, type } = req.body;

    if (!(table_no && size && type)) {
      return res.status(400).send({ msg: "All fields are Required" });
    }

    if (size < 2 || size % 2 !== 0 || size > 10) {
      return res.status(400).send({
        msg: "Minimum table size is 2 and plz enter table size in even number upto 10",
      });
    }

    // check table already exist - table_no
    const existTable = await Table.findOne({ table_no });
    if (existTable) {
      return res
        .status(409)
        .send({ msg: `Table No. ${table_no} already exists` });
    }

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
    const { table_no, size, type } = req.body;

    if (!(table_no && size && type)) {
      return res.status(400).send({ msg: "All fields are Required" });
    }

    if (size < 2 || size % 2 !== 0 || size > 10) {
      return res.status(400).send({
        msg: "Minimum table size is 2 and plz enter table size in even number upto 10",
      });
    }

    // check table already exist - table_no
    const existTable = await Table.findOne({ table_no });
    if (existTable) {
      return res
        .status(409)
        .send({ msg: `Table No. ${table_no} already exists` });
    }

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

    res.status(200).send({ msg: "Table deleted successfully..." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Get the new status from the request body

    // Validate the status value
    if (!status || (status !== "occupied" && status !== "unoccupied")) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    // Find the table by ID and update its status
    const table = await Table.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!table) {
      return res.status(404).json({ msg: "Table not found" });
    }

    res.status(200).json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getTables,
  getTable,
  addTable,
  updateTable,
  deleteTable,
  toggleStatus,
};
