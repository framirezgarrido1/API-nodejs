var mysql = require('mysql');
const express = require("express");

const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port:"8889",
  database : 'status'
});

var devicesResponse;

//Query para traer todos los registros de Lights (limite de 10)
var sql = 'SELECT * FROM status_lights LIMIT 10';

con.connect(function(err) {

	//API rest http://localhost:3005/status

	app.get('/status', function(req, res){
		console.log("Connected!");
		con.query(sql, function (err, result) {
	   		var devicesResponse= {devices: result};

	   		//Imprime por consola los registros
			console.log(result);

			//Imprime los registros
	   		res.json(devicesResponse);
		});
	});
});


app.listen(3005, () => {
 console.log("El servidor está inicializado en el puerto 3005");
});	
