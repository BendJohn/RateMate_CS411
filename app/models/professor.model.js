const sql = require("./db.js");

// constructor
const Professor = function(professor) {
  this.professor_name = professor.professor_name;
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
  sql.query(`SELECT * FROM professor WHERE professor_name LIKE '%${professorName}%'`, (err, res) => {
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

Professor.updateById = (professor_name, professor, result) => {
  sql.query(
    "UPDATE professor SET avg_rating = ? WHERE professor_name = ?",
    [professor.avg_rating, professor_name],
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

Professor.remove = (professor_name, result) => {
  sql.query(`DELETE FROM professor WHERE professor_name = '${professor_name}'`, (err, res) => {
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

    console.log("deleted professor with name: ", professor_name);
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