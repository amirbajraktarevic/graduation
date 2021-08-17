const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Offense = require("./offense").schema;

const personSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  coronaStatus: {
    type: Boolean,
    required: true,
  },
  offense: [
    {
      type: [ObjectId],
      ref: "Offense",
    },
  ],
  vacStatus: {
    type: Boolean,
    requried: true,
  },
  vacDate: {
    type: Date,
    default: "0.0.0",
  },
  reVac: {
    type: Boolean,
    default: false,
  },
  reVacDate: {
    type: Date,
    default: "0.0.0",
  },
  isolationStatus: {
    type: Boolean,
    required: true,
  },
  isolationDate: {
    type: Date,
    default: "0.0.0",
  },
  isolationEndDate: {
    type: Date,
    default: "0.0.0",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  djela: {
    type: [Offense],
  },
});

module.exports = mongoose.model("Person", personSchema);
