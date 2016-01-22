var parser = require('./parser');

var tutByUrl = "http://finance.tut.by/kurs/";
var config={
	d:'.cursList > table > tbody > tr:nth-child(2) > td:nth-child(2) > big'
}
parser.parsePage(tutByUrl,config,console.log.bind(console));