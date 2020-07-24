module.exports = app => {
    const basicsearch = require("../controllers/basicSearch.controller.js");
  
    // Retrieve all basicsearch
    app.get("/basicsearch/:crn/:rtg_upper/:rtg_lower/:gpa_upper/:gpa_lower", basicsearch.findWithCrn);
  
    // Retrieve a single basicsearch with basicsearch
    app.get("/basicsearch", basicsearch.findWithoutCrn);
  };