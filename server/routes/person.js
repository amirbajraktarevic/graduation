const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { restart } = require("nodemon");
const requireLogin = require("../middleware/requireLogin");
const offense = require("../model/offense");
const Person = mongoose.model("Person");
const Offense = mongoose.model("Offense");

router.post("/createperson", requireLogin, (req, res) => {
  const {
    id,
    address,
    firstName,
    lastName,
    coronaStatus,
    offense,
    vacStatus,
    vacDate,
    reVac,
    reVacDate,
    isolationStatus,
    isolationDate,
    isolationEndDate,
  } = req.body;

  if (
    !id ||
    !address ||
    !firstName ||
    !lastName ||
    !coronaStatus ||
    !vacStatus ||
    !isolationStatus
  ) {
    res.status(422).json({ error: "Please fill all of the important fields!" });
  }

  req.user.password = undefined;
  const person = new Person({
    _id: new mongoose.Types.ObjectId(),
    id,
    address,
    firstName,
    lastName,
    coronaStatus,
    offense,
    vacStatus,
    vacDate,
    reVac,
    reVacDate,
    isolationStatus,
    isolationDate,
    isolationEndDate,
    postedBy: req.user,
  });

  if (req.body.coronaStatus == true) {
    person.isolationDate = new Date().toISOString();
    var futureDate = new Date(person.isolationDate);
    futureDate.setDate(futureDate.getDate() + 7);
    person.isolationEndDate = futureDate;
  } else {
    person.isolationDate = new Date().toISOString();
    person.isolationEndDate = new Date().toISOString();
  }

  if (req.body.isolationStatus == true) {
    person.isolationDate = new Date().toISOString();
    var futureDate = new Date(person.isolationDate);
    futureDate.setDate(futureDate.getDate() + 7);
    person.isolationEndDate = futureDate;
  } else {
    person.isolationDate = new Date().toISOString();
    person.isolationEndDate = new Date().toISOString();
  }

  if (req.body.vacStatus == true) {
    person.vacDate = new Date().toISOString();
  } else {
    person.vacDate = new Date().toISOString();
  }

  if (req.body.reVac == true) {
    person.reVacDate = new Date().toISOString();
  } else {
    person.reVacDate = new Date().toISOString();
  }

  person
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/people", requireLogin, (req, res) => {
  Person.find()
    .populate("postedBy", "_id name")
    .then((people) => {
      res.json(people);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.patch("/people/:id", requireLogin, async (req, res) => {
  try {
    let update = req.body;

    if (req.body.coronaStatus === "true") {
      update = {
        coronaStatus: true,
        isolationStatus: true,
        isolationDate: Date.now(),
        isolationEndDate: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
      };
    } else if (req.body.coronaStatus === "false") {
      update = {
        coronaStatus: true,
        isolationDate: null,
        isolationEndDate: null,
      };
    }

    if (req.body.isolationStatus === "true") {
      update = {
        isolationStatus: true,
        isolationDate: Date.now(),
        isolationEndDate: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
      };
    } else if (req.body.isolationStatus === "false") {
      update = {
        isolationStatus: false,
        isolationDate: null,
      };
    }

    if (req.body.vacStatus === "true") {
      update = {
        vacStatus: true,
        vacDate: Date.now(),
      };
    } else if (req.body.vacStatus === "false") {
      update = {
        vacStatus: false,
        reVac: false,
        vacDate: null,
        reVacDate: null,
      };
    }

    if (req.body.reVac === "true") {
      update = {
        reVac: true,
        reVacDate: Date.now(),
      };
    } else if (req.body.reVac === "false") {
      update = {
        reVac: false,
        reVacDate: null,
      };
    }

    const person = await Person.findOneAndUpdate(
      { _id: req.params.id },
      update,
      {
        new: true,
        upsert: true,
      }
    );

    res.send(person);
  } catch {
    res.status(404);
    res.send({ error: "Person doesn't exist!" });
  }
});

router.delete("/people/:id", requireLogin, async (req, res) => {
  try {
    await Person.deleteOne({ _id: req.params.id });
    res.status(200);
    res.send({ message: "Person successfully deleted!" });
  } catch {
    res.status(404);
    res.send({ error: "No person with such ID found!" });
  }
});

router.get("/people/:id", async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    res.send(person);
  } catch {
    res.status(404);
    res.send({ error: "Not found" });
  }
});

router.post("/people/:id", requireLogin, async (req, res) => {
  try {
    req.user.password = undefined;
    const djelo = new Offense({
      name: req.body.name,
      description: req.body.description,
      date: Date.now(),
      ticket: req.body.ticket,
      postedBy: req.user,
    });

    const person = await Person.findOneAndUpdate(
      { _id: req.params.id },
      {
        djela: [djelo],
      },
      { overwrite: false, new: true }
    );

    console.log(person.djela);

    res.send(person);
  } catch {
    res.status(404);
    res.send({ error: "Something went wrong!" });
  }
});

router.get("/people/offenses/:id", requireLogin, async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    res.send(person.djela);
  } catch {
    res.status(404);
    res.send({ error: "Person with that ID not found" });
  }
});

router.delete("/people/offenses/:id", async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    person.djela.pop();

    person.save();
    res.send(person);
  } catch {
    res.status(404);
    res.send({ error: "Can't delete" });
  }
});

module.exports = router;
