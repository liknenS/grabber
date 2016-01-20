var mysql      = require('mysql');
var request = require('request');

function saveToDb(obj){
	var connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  database : 'nik'
	});
	var query = connection.query('INSERT INTO grab_by SET ?', obj, function(err, result) {
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

	// connection.connect();
	// connection.query(query.sql, function(err, rows, fields) {
	// 	 if (err) throw err;
	// });
	 connection.end();
}

setInterval(function(){
	request('https://www.kimonolabs.com/api/70eqfyeu?apikey=iysx7RmhVje46sO9ntpkFJLZuN13YKnj&kimmodify=1', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var tmp = JSON.parse(body);
	    tmp.create = new Date(tmp.create);
	    console.log(tmp);
	    saveToDb(tmp);
	  }
	});
}, 1000);
