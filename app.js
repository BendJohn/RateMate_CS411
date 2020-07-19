const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: 'ht8a,dTW*yj+kH'
  password: 'dbspass1234',
  database: 'ratemate'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
connection.query('SELECT * FROM professor', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});
connection.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});