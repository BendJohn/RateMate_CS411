module.exports = app => {
    const enrollments = require("../controllers/enrollment.controller.js");

    // Create a new Enrollment
    app.post("/enrollments", enrollments.create);

    // Retrieve all Enrollments
    //app.get("/enrollments", enrollments.findAll);

    // Retrieve a single Enrollment with enrollmentName
    app.get("/enrollments/:netid", enrollments.findOne);

    // Update a Enrollment with enrollmentName
    //app.put("/enrollments/:netid", enrollments.update);

    // Delete a Enrollment with enrollmentId
    app.delete("/enrollments/:netid/:crn", enrollments.delete);

    // Delete all Enrollment
    //app.delete("/enrollments", enrollments.deleteAll);
  };
