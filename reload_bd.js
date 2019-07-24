var mqtt = require('mqtt')
var mysql = require('mysql');

var client  = mqtt.connect('mqtt://192.168.1.102:1883')

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port:"8889",
  database : 'status'	
});

let data = [false, 1];

 
client.on('connect', function () {
  client.subscribe('esp32/status/', function (err) {
    if (!err) {
      client.publish('esp32/', 'Save data services')
    }
  })
})
 
client.on('message', function (topic, message) {

  // message is Buffer
	console.log(message.toString())

	if (message.toString()=="Led 01 ON") {
		console.log("IF 01 1")
	  	var sql = 'UPDATE status_lights SET status = 1 WHERE status_lights.id = 4';
	
	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}
	
	  		console.log('Rows affected:', results.affectedRows);
			});
	}
	
	if (message.toString()=="Led 01 OFF") {
		console.log("IF 01 0")
	  	var sql = 'UPDATE status_lights SET status = 0 WHERE status_lights.id = 4';
	
	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}
	
	  		console.log('Rows affected:', results.affectedRows);
			});
	}

  });
  //client.end()	