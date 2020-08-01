module.exports = app => {
    const recommendation = require("../controllers/recommendation.controller.js");
  
    // Retrieve a single basicsearch with basicsearch
    app.get("/recommendation/:netid", recommendation.findByNetid);
  };