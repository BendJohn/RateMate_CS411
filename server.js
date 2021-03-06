const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the boiler plate ratemate!" });
});

// routing
require("./app/routes/professor.routes.js")(app);
require("./app/routes/basicSearch.routes.js")(app);
require("./app/routes/enrollment.routes.js")(app);
require("./app/routes/recommendation.routes.js")(app);

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});