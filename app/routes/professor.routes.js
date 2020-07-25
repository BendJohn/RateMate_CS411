module.exports = app => {
    const professors = require("../controllers/professor.controller.js");

    // Create a new Professor
    app.post("/professors", professors.create);

    // Retrieve all Professors
    app.get("/professors", professors.findAll);

    // Retrieve a single Professor with professorName
    app.get("/professors/:professorName", professors.findOne);

    // Update a Professor with professorName
    app.put("/professors/:professorName", professors.update);

    // Delete a Professor with professorId
    app.delete("/professors/:professorName", professors.delete);

    // Create a new Professor
    app.delete("/professors", professors.deleteAll);
  };
