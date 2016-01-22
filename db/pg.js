var pg = require('pg');
var conString = process.env.DATABASE_URL||"postgres://mejgrqwndufkts:Yt5V9Ny8ufXzXnbV7IU4FlCbaK@ec2-75-101-163-171.compute-1.amazonaws.com:5432/dl7sihu45h5cv?ssl=true";

function query(query, cb){
	pg.connect(conString, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }

	
		client.query(query, function(err, result) {
			if(err) {
			    console.error('error query', err);
			}
		    done();
			cb && cb(result && result.rows);
		});
	});
}

module.exports = {
	query:query
}