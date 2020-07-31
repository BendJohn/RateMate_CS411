module.exports = app => {
    const basicsearch = require("../controllers/basicSearch.controller.js");
  
    // Retrieve a single basicsearch with basicsearch
    app.get("/basicsearch", basicsearch.findWithoutCrn);
  };