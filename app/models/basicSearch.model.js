const sql = require("./db.js");

// constructor
const BasicSearch = function(basicSearch) {
  this.subject = basicSearch.subject;
  this.number = basicSearch.number;
  this.courseName = basicSearch.courseName;
  this.keyword = basicSearch.keyword;
  this.prof_lastname = basicSearch.prof_lastname;
  this.rtg_lower = basicSearch.rtg_lower;
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
  // Add search parameters if they are not undefined
  var search_query = "SELECT c.subject, c.number, c.name, c.description, s.CRN, s.avg_gpa, p.firstname, p.lastname, p.avg_rating FROM course c NATURAL JOIN section s, professor p WHERE s.professor_name LIKE CONCAT(p.lastname,'%')";
  
  if (basicSearch.subject != undefined) {
    search_query += ` AND c.subject='${basicSearch.subject}'`;
  }
  if (basicSearch.number != undefined) {
    search_query += ` AND c.number=${basicSearch.number}`;
  }
  if (basicSearch.courseName != undefined) {
    search_query += ` AND c.name LIKE '%${basicSearch.courseName}%'`;
  }
  if (basicSearch.keyword != undefined) {
    search_query += ` AND c.description LIKE '%${basicSearch.keyword}%'`;
  }
  if (basicSearch.prof_lastname != undefined) {
    search_query += ` AND p.lastname='${basicSearch.prof_lastname}'`;
  }
  if (basicSearch.rtg_lower != undefined) {
    search_query += ` AND p.avg_rating>=${basicSearch.rtg_lower}`;
  }
  if (basicSearch.gpa_lower != undefined) {
    search_query += ` AND s.avg_gpa>=${basicSearch.gpa_lower}`;
  }
  
  console.log(`Final search query: ${search_query}`);

  sql.query(search_query, (err, res) => {
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