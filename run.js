var request = require('request');
var db = require('./db/db');
var parser = require('./parser');
var notifier = require('node-notifier');
var express = require('express');
var _ = require('underscore');

var app = express();
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 5000));
app.use('/public', express.static('public'));
if(process.env.PORT){
	
}

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
app.get('/table', function (req, res) {
	db.getAllFromBase('grab_by',function(result){
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

})
app.get('/table.json', function (req, res) {
	db.getAllFromBase('grab_by',function(result){
		res.send(result);
	});
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

	
var conf = { 
	buy: '.cursList_table tr:nth-child(2) td:nth-child(2) big',
	sell: '.cursList_table tr:nth-child(2) td:nth-child(3) big',
	nbrb: '.cursList_table tr:nth-child(2) td:nth-child(4) big'
}
//parser.parseTutBy(conf, console.log.bind(console));
var courseTmp ={
	buy: 0,
	sell: 0,
	nbrb: 0
}
function saveParsed(){
	parser.parseTutBy(conf, function (res) {
	    db.saveToBase('grab_by', res);

	    delete res.create;
		res.buy = +res.buy.replace(' ', '');
		res.sell = +res.sell.replace(' ', '');
		if(!_.isEqual(courseTmp, res)){
			notifier.notify({
			  'title': 'New Course',
			  'message': 'buy:' +res.buy+' ('+(res.buy - courseTmp.buy )+ ') || sell:' + res.sell +' ('+ (res.sell - courseTmp.sell) +')'
			});
		}
	    courseTmp = res;
	});
};
function loop(){
	saveParsed();
	setTimeout(loop,2*60*1000);
}
loop();
