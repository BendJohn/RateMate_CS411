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

BasicSearch.findNoCrn = (subject, number, courseName, keyword, prof_lastname, rtg_lower, gpa_lower, result) => {
  // Add search parameters if they are not undefined
  var search_query = "SELECT c.subject, c.number, c.name, c.description, s.CRN, s.avg_gpa, p.firstname, p.lastname, p.avg_rating FROM course c JOIN section s ON c.subject=s.subject AND c.number=s.number, professor p WHERE s.professor_name LIKE CONCAT(p.lastname,', ',p.firstname,'%')";
  
  console.log(subject + " " + number + " " + courseName + " " + keyword + " " + prof_lastname + " " + rtg_lower + " " + gpa_lower);

  if (subject != undefined && subject != "") {
    search_query += ` AND c.subject='${subject}'`;
  }
  if (number != undefined && number != "") {
    search_query += ` AND c.number=${number}`;
  }
  if (courseName != undefined && courseName != "") {
    search_query += ` AND c.name LIKE '%${courseName}%'`;
  }
  if (keyword != undefined && keyword != "") {
    search_query += ` AND c.description LIKE '%${keyword}%'`;
  }
  if (prof_lastname != undefined && prof_lastname != "") {
    search_query += ` AND p.lastname='${prof_lastname}'`;
  }
  if (rtg_lower != undefined && rtg_lower != "") {
    search_query += ` AND p.avg_rating>=${rtg_lower}`;
  }
  if (gpa_lower != undefined && gpa_lower != "") {
    search_query += ` AND s.avg_gpa>=${gpa_lower}`;
  }

  // search_query += " GROUP BY p.firstname, p.lastname";
  
  console.log(`Final search query: ${search_query}`);

  sql.query(search_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
      }
  
    console.log("courses: ", res);
    console.log(typeof(res));
    result(null, res);
  });
};

module.exports = BasicSearch;