var mysql      = require('mysql');

function newConn(){
	return mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  database : 'nik'
	});
}

function saveToBase(base, obj){
	var connection = newConn();
	var query = connection.query('INSERT INTO ' + base + ' SET ?', obj, function(err, result) {
	});
	connection.end();
}
function getAllFromBase(base, cb){
	var connection = newConn();
	connection.query('SELECT * FROM '+ base, function(err,res){
		cb(res);
	});

	connection.end();

}
module.exports = {
	setConfig
	saveToBase: saveToBase,
	getAllFromBase: getAllFromBase
}