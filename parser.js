var request = require('request');
var cheerio = require("cheerio");

function parsePage(url, config, cb){
	request({
	  uri: url,
		}, function(error, response, body) {
		  var $ = cheerio.load(body);
		  var res = {};
		  for (var i in config){
		  	res[i] = $(config[i]).text();
		  }
		  res.createtime = new Date();
		  cb(res);
		});
}

module.exports = {
	parsePage: parsePage
}