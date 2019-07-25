const express = require("express");
const app = express();

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')

client.subscribe('esp32/status/')
console.log('Suscrito a esp32/status/')

client.on('message', function (topic, message) {
  	console.log(topic, message.toString())
});	

let light = {
 id: 100000,
 status: '',
 name: ''
};

app.post('/', function(req, res) {
	res.send('Saludos desde express');
});	

app.post('/light/01/on', function(req, res) {

	client.publish('esp32/status/', 'light-01-on')

  	light = {
  		id: 'id01',
  		topic: 'light-01',
  		status: 'on',
  		name: 'light habitacion 01'
  	};

 	res.send(light);
});	

app.post('/light/01/off', function(req, res) {

	client.publish('esp32/status/', 'light-01-off')

  	light = {
  		id: 'id01',
  		topic: 'light-01',
  		status: 'off',
  		name: 'light habitacion 01'
  	};

 	res.send(light);
});	


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});	
