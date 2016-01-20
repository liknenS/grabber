var mysql      = require('mysql');
var request = require('request');
//var http = require('');

var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
app.get('/table', function (req, res) {
	var con = newConn();
	con.query('SELECT * FROM grab_by',function(err, result){
		var table = [];
		for(var i in result){
			var tmp = [];
			for(var j in result[i]){
				tmp.push(result[i][j]);
			}
			table.push(tmp);
		}
		
  		res.render('table', {objects: table} );
	});
	con.end();

})
app.get('/table.json', function (req, res) {
	var con = newConn();
	con.query('SELECT * FROM grab_by',function(err, result){
		res.send(result);
	});
	con.end();
})

app.listen(3030,'192.168.0.109');

function newConn(){
	return mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  database : 'nik'
	});
}

function saveToDb(obj){
	var connection = newConn();
	var query = connection.query('INSERT INTO grab_by SET ?', obj, function(err, result) {
		console.log(result);
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
}, 10*60*1000);
