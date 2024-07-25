const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    table_no: { type: Number,unique: true, required: [true, "Table_no is require"] },
    status: { type: String,default:"unoccupied", required: [true, "Status is require"] },
    size: { type: Number,default:4, required: [true, "Size is require"] },
    type: { type: String, required: [true, "Type is require"] },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("table", tableSchema);
module.exports = Table;