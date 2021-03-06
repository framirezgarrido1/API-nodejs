var mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const Devices = require('./models/devices.js')

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

app.post('/devices', function(req, res) {
  //res.send('Saludos desde express');
  console.log('POST /api/devices')
  console.log(req.body)

  let devices = new Devices()
  devices.name = req.body.name
  devices.type = req.body.type
  devices.status = req.body.status
  devices.topic = req.body.topic

  devices.save((err, productStored) => {
    if (err) res.status(500).send({message:`Error al guardar ${err}`})

    res.status(200).send({Device: productStored})
  })
})

con.connect(function(err) {


  // API rest http://localhost:3005/id/topic/status/
  // Escribir nuevo estado en el dispositivo

  app.get('/:id/:topic/:status', function(req, res){

    //Publicando en el canal MQTT seleccionado
    client.publish(`esp32/${req.params.topic}/`, `light-${req.params.id}-${req.params.status}`)


      console.log("Connected!");

      var sqludapte = `UPDATE status_lights SET status = ${req.params.status} WHERE status_lights.id = ${req.params.id}`;

      con.query(sqludapte, data, (error, results, fields) => {
        if (error){
          return console.error(error.message);
        }
        console.log(`Status "${req.params.status}" guardado en base de datos en id "${req.params.id}"`)
        var sql = `SELECT * FROM status_lights WHERE id = ${req.params.id}`;
        con.query(sql, function (err, result) {
          var devicesResponse= {devices: result};
          //Imprime por consola los registros
          console.log(result);
          //Imprime los registros
          res.json(devicesResponse);
        });
      });

  });

  // API rest http://localhost:3005/id/status/
  // Estado poe dispositivo
  app.get('/:id/:topic/', function(req, res){

    console.log("Connected!");
    var sql = `SELECT * FROM status_lights WHERE id = ${req.params.id}`;
    con.query(sql, function (err, result) {
      var devicesResponse= {devices: result};
      //Imprime por consola los registros
      console.log(result);
      //Imprime los registros
      res.json(devicesResponse);
    });

  });

  // API rest http://localhost:3005/status
  // Estado general de todos los dispositivos 
  app.get('/status', function(req, res){

    console.log("Connected!");
    var sql = 'SELECT * FROM status_lights';
    con.query(sql, function (err, result) {
      var devicesResponse= {devices: result};
      //Imprime por consola los registros
      console.log(result);
      //Imprime los registros
      res.json(devicesResponse);
    });

  });


});	

mongoose.connect('mongodb://localhost:27017/storage_devices', (err, res) => {
  if (err) throw err 
  console.log('conexion OK')

  app.listen(3001, () => {
    console.log("El servidor está inicializado en el puerto 3001");
  })
})

