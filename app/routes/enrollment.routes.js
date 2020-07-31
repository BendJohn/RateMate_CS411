module.exports = app => {
    const enrollments = require("../controllers/enrollment.controller.js");

    // Create a new Enrollment
    app.post("/enrollments", enrollments.create);

    // Retrieve all Enrollments
    app.get("/enrollments", enrollments.findAll);

    // Retrieve a single Enrollment with enrollmentName
    app.get("/enrollments/:enrollmentName", enrollments.findOne);

    // Update a Enrollment with enrollmentName
    app.put("/enrollments/:enrollmentName", enrollments.update);

    // Delete a Enrollment with enrollmentId
    app.delete("/enrollments/:enrollmentName", enrollments.delete);

    // Create a new Enrollment
    app.delete("/enrollments", enrollments.deleteAll);
  };
