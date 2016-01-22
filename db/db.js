var db;
var squel;  

if(false&&process.env.DATABASE_URL){
	db = require('./mysql');
	console.log('mysql');
	squel = require('squel').useFlavour('mysql');
}
else {
	db = require('./pg');
	console.log('pg');
	squel = require('squel').useFlavour('postgres');
}

squel.registerValueHandler(Date, function(date) {
	var s = date.toISOString();
  return "'"+s+"'";
});

function saveToBase(base, obj){
	var query = squel.insert()
        .into(base)
        .setFields(obj)
        .toString();
        console.log(query);
	db.query(query, function(result) {
	})
}

function getAllFromBase(base, cb){
	var query = squel.select()
        .from(base)
        .toString();
    db.query(query, cb);
}

module.exports = {
	saveToBase: saveToBase,
	getAllFromBase: getAllFromBase
}