var request = require('request');
var cheerio = require("cheerio");

function parseTutBy(config, cb){
	request({
	  uri: "http://finance.tut.by/kurs/",
		}, function(error, response, body) {
		  var $ = cheerio.load(body);
		  var res = {};
		  for (var i in config){
		  	res[i] = $(config[i]).text();
		  }
		  res.create = new Date();
		  cb(res);
		});
}

module.exports = {
	parseTutBy: parseTutBy
}