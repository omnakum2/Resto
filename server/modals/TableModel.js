const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    table_no: { type: Number, required: [true, "Table_no is require"] },
    status: { type: String, required: [true, "Status is require"] },
    size: { type: Number, required: [true, "Size is require"] },
    type: { type: String, required: [true, "Type is require"] },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("table", tableSchema);
module.exports = Table;