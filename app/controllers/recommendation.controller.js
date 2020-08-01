const Recommendation = require("../models/recommendation.model.js");

// Retrieve all basicSearch from the database.
exports.findByNetid = (req, res) => {
    Recommendation.find( req.params.netid, (err, data) => {
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