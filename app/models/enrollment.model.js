const sql = require("./db.js");

// constructor
const Enrollment = function(enrollment) {
  this.netid = enrollment.netid;
  this.name = enrollment.name;
  this.standing = enrollment.standing;
  this.department = enrollment.department;
  this.crn = enrollment.crn;
};

// Create new enrollment
Enrollment.create = (newEnrollment, result) => {
    // should we insert a new user as well?
    var sql_query = `INSERT INTO enrollments VALUES('${newEnrollment.netid}','${newEnrollment.crn}')`;
    if (newEnrollment.name != undefined && newEnrollment.standing != undefined && newEnrollment.department != undefined) {
        sql_query = `INSERT INTO user VALUES('${newEnrollment.netid}','${newEnrollment.name}','${newEnrollment.standing}','${newEnrollment.department}'); ` + sql_query;
    }
    
  sql.query(sql_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created enrollment: ", {...newEnrollment });
    result(null, { ...newEnrollment });
  });
};

Enrollment.findById = (enrollmentName, result) => {
  sql.query(`SELECT * FROM enrollments WHERE enrollment_name LIKE '%${enrollmentName}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found enrollment: ", res);
      result(null, res);
      return;
    }

    // not found Enrollment with the id
    result({ kind: "not_found" }, null);
  });
};

Enrollment.getAll = result => {
  sql.query("SELECT * FROM enrollments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("enrollments: ", res);
    result(null, res);
  });
};

Enrollment.updateById = (enrollment_name, enrollment, result) => {
  sql.query(
    "UPDATE enrollments SET avg_rating = ? WHERE enrollment_name = ?",
    [enrollment.avg_rating, enrollment_name],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Enrollment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated enrollment: ", { ...enrollment });
      result(null, { ...enrollment });
    }
  );
};

Enrollment.remove = (enrollment_name, result) => {
  sql.query(`DELETE FROM enrollments WHERE enrollment_name = '${enrollment_name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Enrollment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted enrollment with name: ", enrollment_name);
    result(null, res);
  });
};

Enrollment.removeAll = result => {
  sql.query("DELETE FROM enrollments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} enrollments`);
    result(null, res);
  });
};

module.exports = Enrollment;