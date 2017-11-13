var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'optionalproject'
});


connection.connect();


var findAll = function (callback) {
  connection.query('SELECT * FROM movieproject', function (err, rows, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    } 
  })
}


var addOne = function (data, callback) {
    connection.query(`INSERT INTO movieproject (titles) VALUES ('${data}');`, function (err, rows, fields) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, rows);
      }
    })   
}



module.exports.findAll = findAll;
module.exports.addOne = addOne;