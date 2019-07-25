var mqtt = require('mqtt')
var mysql = require('mysql');
var Pushetta=require("pushetta");

var pushetta = new Pushetta("94a800eaf22a2f98ca546a7316da82e857cdb9b4");

var client  = mqtt.connect('mqtt://localhost:1883')

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
      //client.publish('esp32/', 'Save data services')
      client.publish('esp32/status/', 'Corriendo update_status')
    }
  })
})
 
client.on('message', function (topic, message) {

  // message is Buffer
	console.log(message.toString())

	if (message.toString()=="light-01-on") {
	  	var sql = 'UPDATE status_lights SET status = 1 WHERE status_lights.id = 1';
	  	pushetta.pushMessage("Costanera1980", "Luces de habitacion encendidas");
	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}
	  		console.log('Status "1" guardado en base de datos en id 1')
		});
	}
	
	if (message.toString()=="light-01-off") {
	  	var sql = 'UPDATE status_lights SET status = 0 WHERE status_lights.id = 1';
	  	pushetta.pushMessage("Costanera1980", "Luces de habitacion apagadas");
	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}
	  		console.log('Status "0" guardado en base de datos en id 1')
		});
	}

	if (message.toString()=="light-02-on") {
	  	var sql = 'UPDATE status_lights SET status = 1 WHERE status_lights.id = 2';
	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}
	
	  		console.log('Status "1" guardado en base de datos en id 2')
		});
	}

	if (message.toString()=="light-02-off") {
	  	var sql = 'UPDATE status_lights SET status = 0 WHERE status_lights.id = 2';
	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}
	  		console.log('Status "0" guardado en base de datos en id 2')
		});
	}

});
  //client.end()	