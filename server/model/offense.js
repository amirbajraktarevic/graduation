const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const offenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ticket: {
    type: Number,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Offense", offenseSchema);
