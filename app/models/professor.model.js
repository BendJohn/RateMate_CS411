const sql = require("./db.js");

// constructor
const Professor = function(professor) {
  this.firstname = professor.firstname;
  this.lastname = professor.lastname;
  this.avg_rating = professor.avg_rating;
};

Professor.create = (newProfessor, result) => {
  sql.query("INSERT INTO professor SET ?", newProfessor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created professor: ", {...newProfessor });
    result(null, { ...newProfessor });
  });
};

Professor.findById = (professorName, result) => {
  sql.query(`SELECT * FROM professor WHERE firstname LIKE '%${professorName}%' OR lastname LIKE '%${professorName}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found professor: ", res);
      result(null, res);
      return;
    }

    // not found Professor with the id
    result({ kind: "not_found" }, null);
  });
};

Professor.getAll = result => {
  sql.query("SELECT * FROM professor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("professors: ", res);
    result(null, res);
  });
};

Professor.updateById = (professorName, professor, result) => {
  sql.query(
    "UPDATE professor SET avg_rating = ? WHERE firstname = ? AND lastname = ?",
    [professor.avg_rating, professorName.split(" ")[0], professorName.split(" ")[1]],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Professor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated professor: ", { ...professor });
      result(null, { ...professor });
    }
  );
};

Professor.remove = (professorName, result) => {
  var arr = professorName.split(" ");
  var firstname = arr[0];
  var lastname = arr[1];
  sql.query(`DELETE FROM professor WHERE firstname = '${firstname}' AND lastname='${lastname}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Professor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted professor with name: ", professorName);
    result(null, res);
  });
};

Professor.removeAll = result => {
  sql.query("DELETE FROM professors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} professors`);
    result(null, res);
  });
};

module.exports = Professor;