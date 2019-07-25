const express = require("express");
const app = express();

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')

client.subscribe('esp32/status/')
console.log('Suscrito a esp32/status/')

client.on('message', function (topic, message) {
  	console.log(topic, message.toString())
});	

let device = {
 id: 100000,
 status: '',
 name: ''
};

app.post('/', function(req, res) {
	res.send('Saludos desde express');
});	

app.post('/light/01/on', function(req, res) {

	client.publish('esp32/status/', 'light-01-on')

  device = {
  	id: '1',
  	topic: 'esp32/status/',
  	status: '1',
  	name: 'light-0001'
  };

 	res.send(device);
});	

app.post('/light/01/off', function(req, res) {

	client.publish('esp32/status/', 'light-01-off')

  device = {
    id: '1',
    topic: 'esp32/status/',
    status: '0',
    name: 'light-0001'
  };

 	res.send(device);
});	


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});	
