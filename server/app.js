const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./mongo.js");

const PORT = 5000;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connection successful");
});

mongoose.connection.on("error", () => {
  console.log("Connection not successful");
});

require("./model/user");
require("./model/person");
require("./model/offense");

app.use(express.json());
app.use(require("./routes/authen.js"));
app.use(require("./routes/person.js"));
app.use(require("./routes/offense.js"));

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
