const BasicSearch = require("../models/basicSearch.model.js");

// Retrieve all basicSearch from the database.
exports.findWithoutCrn = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    BasicSearch.findNoCrn(
        req.query.subject, req.query.number, req.query.courseName, req.query.keyword, req.query.prof_lastname, req.query.rtg_lower, req.query.gpa_lower,
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `You parameters were inputted incorrectly.`
            });
            } else {
            res.status(500).send({
                message: "Error updating section with name "
            });
            }
        } else res.send(data);
        }
    );
};