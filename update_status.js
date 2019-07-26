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

	msjTopic = message.toString()

	var idDevice = msjTopic[6]
	var statusDevice = msjTopic[8]

	if (message.toString()==`light-${idDevice}-${statusDevice}`) {
	  	var sql = `UPDATE status_lights SET status = ${statusDevice} WHERE status_lights.id = ${idDevice}`;
	  	if (statusDevice == "1") {
	  		pushetta.pushMessage("Costanera1980", `Luces de habitacion ${idDevice} encendidas`);
	  	}

	  	else {
	  		pushetta.pushMessage("Costanera1980", `Luces de habitacion ${idDevice} apagadas`);
	  	}
	  	
	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}
	  		console.log(`Status "${statusDevice}" guardado en base de datos en id "${idDevice}"`)
		});
	}

});
  //client.end()	