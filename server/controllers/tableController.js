const AppDataSource = require("../config/database");
const TableEntity = require("../entities/TableEntity");

const tableRepository = AppDataSource.getRepository(TableEntity);

// fetch all tables
const getTables = async (req, res) => {
  try {
    const table = await tableRepository.find();
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// fetch one table
const getTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await tableRepository.findOneBy({ id: parseInt(id) });
    if (!table) return res.status(404).json({ msg: "Table not found" });
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
    const existTable = await tableRepository.findOneBy({ table_no: parseInt(table_no) });
    if (existTable) {
      return res
        .status(409)
        .send({ msg: `Table No. ${table_no} already exists` });
    }

    const table = tableRepository.create(req.body);
    await tableRepository.save(table);
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

    // check table already exist - table_no (excluding current)
    const existTable = await tableRepository.findOneBy({ table_no: parseInt(table_no) });
    if (existTable && existTable.id !== parseInt(id)) {
      return res
        .status(409)
        .send({ msg: `Table No. ${table_no} already exists` });
    }

    let table = await tableRepository.findOneBy({ id: parseInt(id) });

    if (!table) {
      return res.status(404).json({ msg: "Table not found" });
    }

    tableRepository.merge(table, req.body);
    const updatedTable = await tableRepository.save(table);
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete tables
const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tableRepository.delete(id);

    if (result.affected === 0) {
      return res.status(404).json({ msg: "Table not found" });
    }

    res.status(200).send({ msg: "Table deleted successfully..." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    // Validate the status value
    if (!status || (status !== "occupied" && status !== "unoccupied")) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const table = await tableRepository.findOneBy({ id: parseInt(id) });

    if (!table) {
      return res.status(404).json({ msg: "Table not found" });
    }

    table.status = status;
    await tableRepository.save(table);

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

module.exports = {
  getTables,
  getTable,
  addTable,
  updateTable,
  deleteTable,
  toggleStatus,
};
