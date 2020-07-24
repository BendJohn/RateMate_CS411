const sql = require("./db.js");

// constructor
const BasicSearch = function(basicSearch) {
  this.rtg_upper = basicSearch.rtg_upper;
  this.rtg_lower = basicSearch.rtg_lower;
  this.gpa_upper = basicSearch.gpa_upper;
  this.gpa_lower = basicSearch.gpa_lower;
};

BasicSearch.findByCrn = (crn, basicSearch, result) => {
  sql.query(`SELECT * FROM section NATURAL JOIN professor NATURAL JOIN course WHERE avgGpa > ${basicSearch.gpa_lower} AND avgGpa < ${basicSearch.gpa_upper} AND avg_rating > ${basicSearch.rtg_lower} AND avg_rating < ${basicSearch.rtg_upper} AND CRN = ${crn}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("courses: ", res);
    result(null, res);
  });
};

BasicSearch.findNoCrn = (basicSearch, result) => {
    sql.query(`SELECT * FROM section NATURAL JOIN professor NATURAL JOIN course WHERE avgGpa > ${basicSearch.gpa_lower} AND avgGpa < ${basicSearch.gpa_upper} AND avg_rating > ${basicSearch.rtg_lower} AND avg_rating < ${basicSearch.rtg_upper}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("courses: ", res);
          result(null, res);
    });
  };

module.exports = BasicSearch;