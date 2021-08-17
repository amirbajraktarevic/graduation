const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const { db } = require("../model/user");
const Offense = mongoose.model("Offense");

router.post("/createoffense", requireLogin, (req, res) => {
  const { name, description, date, ticket } = req.body;

  if (!name || !date || !ticket) {
    res.status(422).json({ error: "Please fill all of the fields!" });
  }

  req.user.password = undefined;
  const offense = new Offense({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    date,
    ticket,
    postedBy: req.user,
  });

  offense
    .save()
    .then((result) => {
      res.json({ offense: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
