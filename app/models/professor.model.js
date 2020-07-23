const sql = require("./db.js");

// constructor
const Professor = function(professor) {
  this.name = professor.name;
  this.rating = professor.rating;
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
  sql.query(`SELECT * FROM professor WHERE name = ${professorName}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found professor: ", res[0]);
      result(null, res[0]);
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

Professor.updateById = (name, professor, result) => {
  sql.query(
    "UPDATE professor SET rating = ? WHERE name = ?",
    [professor.rating, name],
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

Professor.remove = (name, result) => {
  sql.query("DELETE FROM professors WHERE name = ?", name, (err, res) => {
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

    console.log("deleted professor with name: ", name);
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