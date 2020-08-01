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

// Find all the enrollments that  belong to user identified by their netid
Enrollment.findById = (netid, result) => {
  sql.query(`SELECT e.netid, s.subject, s.number, e.crn FROM enrollments e LEFT JOIN section s ON e.crn=s.crn WHERE e.netid='${netid}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }


    console.log("found enrollment: ", res);
    result(null, res);
    return;
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

Enrollment.remove = (netid, crn, result) => {
  sql.query(`DELETE FROM enrollments WHERE netid='${netid}' AND CRN='${crn}'`, (err, res) => {
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

    console.log(`deleted enrollment with name: (${netid},${crn})`);
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