const Professor = require("../models/professor.model.js");

// Create and Save a new Professor
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

  // Create a Professor
    const professor = new Professor({
        professor_name: req.body.professor_name,
        avg_rating: req.body.avg_rating
    });

    // Save Professor in the database
    Professor.create(professor, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Professor."
            });
        else res.send(data);
    });
};

// Retrieve all Professor from the database.
exports.findAll = (req, res) => {
    Professor.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving professors."
          });
        else res.send(data);
      });
};

// Find a single Professor with a professorId
exports.findOne = (req, res) => {
    Professor.findById(req.params.professor_name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Professor with id ${req.params.professor_name}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Professor with id " + req.params.professor_name
            });
          }
        } else res.send(data);
      });
};

// Update a Professor identified by the professor_name in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Professor.updateById(
        req.params.professor_name,
        new Professor(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Professor with name ${req.params.professor_name}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Professor with name " + req.params.professor_name
            });
            }
        } else res.send(data);
        }
    );
};

// Delete a Professor with the specified professorId in the request
exports.delete = (req, res) => {
    Professor.remove(req.params.professor_name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Professor with name ${req.params.professor_name}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Professor with name " + req.params.professor_name
            });
          }
        } else res.send({ message: `Professor was deleted successfully!` });
      });
};

// Delete all Professors from the database.
exports.deleteAll = (req, res) => {
    Professor.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all professors."
          });
        else res.send({ message: `All Professor were deleted successfully!` });
      });
};