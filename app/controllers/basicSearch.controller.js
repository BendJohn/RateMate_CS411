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
        req.params.subject, req.params.number, req.params.courseName, req.params.keyword, req.params.prof_lastname, req.params.rtg_lower, req.params.gpa_lower,
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