const Enrollment = require("../models/enrollment.model.js");

// Create and Save a new Enrollment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

  // Create a Enrollment
    const enrollment = new Enrollment({
        netid: req.body.netid,
        name: req.body.name,
        standing: req.body.standing,
        department: req.body.department,
        crn: req.body.crn
    });

    // Save Enrollment in the database
    Enrollment.create(enrollment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Enrollment."
            });
        else res.send(data);
    });
};

// Retrieve all Enrollment from the database.
exports.findAll = (req, res) => {
    Enrollment.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving enrollments."
          });
        else res.send(data);
      });
};

// Find a single Enrollment with a enrollmentId
exports.findOne = (req, res) => {
    Enrollment.findById(req.params.netid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Enrollment with net id ${req.params.netid}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Enrollment with net id " + req.params.netid
            });
          }
        } else res.send(data);
      });
};

// Update a Enrollment identified by the enrollment_name in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Enrollment.updateById(
        req.params.enrollmentName,
        new Enrollment(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Enrollment with name ${req.params.enrollmentName}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Enrollment with name " + req.params.enrollmentName
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Enrollment with the specified enrollmentId in the request
exports.delete = (req, res) => {
    Enrollment.remove(req.params.netid, req.params.crn, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Enrollment with name ${req.params.netid}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Enrollment with name " + req.params.netid
            });
          }
        } else res.send({ message: `Enrollment (${req.params.netid}, ${req.params.crn}) was deleted successfully!` });
      });
};

// Delete all Enrollments from the database.
exports.deleteAll = (req, res) => {
    Enrollment.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all enrollments."
          });
        else res.send({ message: `All Enrollments were deleted successfully!` });
      });
};
