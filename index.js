var mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
  app.get('/:id/:topic/:status', function(req, res){


    //Publicando en el canal MQTT seleccionado
    client.publish(`esp32/${req.params.topic}/`, `light-${req.params.id}-${req.params.status}`)

    setTimeout(function(){
      console.log("Esperando 2 segundos...")
      console.log("Connected!");
      var sql = `SELECT * FROM ${req.params.status}_lights WHERE id = ${req.params.id}`;
      con.query(sql, function (err, result) {
        var devicesResponse= {devices: result};
        //Imprime por consola los registros
        console.log(result);
        //Imprime los registros
        res.json(devicesResponse);
      });
    },1000);
  });
});	


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});	
