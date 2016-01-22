var mysql      = require('mysql');

function newConn(){
	return mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  database : 'nik'
	});
}

function query(query, cb){
	var connection = newConn();
	var query = connection.query(query, function(err, result) {
		if(err) return console.log('mysql error',err);
		cb && cb(result);
	});
	connection.end();
}

module.exports = {
	query:query
}