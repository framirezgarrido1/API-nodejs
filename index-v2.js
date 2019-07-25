var mysql = require('mysql');
const express = require("express");
const app = express();

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port:"8889",
  database : 'status'
});

var devicesResponse;

client.subscribe('esp32/status/')
console.log('Suscrito a esp32/status/')

client.on('message', function (topic, message) {
  	console.log(topic, message.toString())
});	


app.post('/', function(req, res) {
	res.send('Saludos desde express');
});	



con.connect(function(err) {

  //API rest http://localhost:3005/status

  app.get('/light/01/on', function(req, res){
    client.publish('esp32/status/', 'light-01-on')
    //delay(1000);
    console.log("Connected!");
    var sql = 'SELECT * FROM status_lights WHERE id = 1';
    con.query(sql, function (err, result) {
      var devicesResponse= {devices: result};

      //Imprime por consola los registros
      console.log(result);

      //Imprime los registros
      res.json(devicesResponse);
    });
  });

  app.get('/light/01/off', function(req, res){
    client.publish('esp32/status/', 'light-01-off')
    //delay(1000);
    console.log("Connected!");
    var sql = 'SELECT * FROM status_lights WHERE id = 1';
    con.query(sql, function (err, result) {
      var devicesResponse= {devices: result};

      //Imprime por consola los registros
      console.log(result);

      //Imprime los registros
      res.json(devicesResponse);
    });
  });


});	


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});	
