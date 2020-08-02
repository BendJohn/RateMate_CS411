module.exports = app => {
    const basicsearch = require("../controllers/basicSearch.controller.js");
  
    // Retrieve a single basicsearch with basicsearch
    // app.get("/basicsearch/:subject/:number/:courseName/:keyword/:prof_lastname/:rtg_lower/:gpa_lower", basicsearch.findWithoutCrn);
    app.get("/basicsearch", basicsearch.findWithoutCrn);
  };