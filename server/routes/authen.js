const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../mongo.js");
const requireLogin = require("../middleware/requireLogin.js");

const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

router.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !name || !role) {
    res.status(406).json({ error: "Parameters can't be empty!" });
  }

  const domain = email.split("@")[1];

  if (domain != "ks.gov.ba" && domain != "mup.ks.gov.ba") {
    res.status(404).json({ message: "E-mail must be goverment based!" });
  }

  console.log(domain);

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(400).json({ error: "E-mail already in use!" });
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        email,
        password: hashedPassword,
        name,
        role,
      });

      res.status(200).json({ message: "User created successfully!" });

      console.log(user);

      user
        .save()
        .then((user) => {
          res.json({ message: "User created succesfully!" });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Please enter your e-mail and password!" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid e-mail or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ message: "You have signed in successfully!" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, role } = savedUser;
          res.json({ token, user: { _id, name, email, role } });
        } else {
          return res.status(422).json({ error: "Invalid e-mail or password!" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = router;
