const BasicSearch = require("../models/basicSearch.model.js");

// Retrieve all basicSearch from the database.
exports.findWithCrn = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    BasicSearch.findNoCrn(
        req.params.crn,
        new BasicSearch(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Professor with name ${req.params.professorName}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Professor with name " + req.params.professorName
            });
            }
        } else res.send(data);
        }
    );
};

// Retrieve all basicSearch from the database.
exports.findWithoutCrn = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    BasicSearch.findNoCrn(
        new BasicSearch(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Professor with name ${req.params.professorName}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Professor with name " + req.params.professorName
            });
            }
        } else res.send(data);
        }
    );
};