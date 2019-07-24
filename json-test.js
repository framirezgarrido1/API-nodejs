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

var sql = 'SELECT * FROM status_lights LIMIT 10';

con.connect(function(err) {


	app.get('/status', function(req, res){
		console.log("Connected!");
		con.query(sql, function (err, result) {
	   		var devicesResponse= {devices: result};
			console.log(result);
	   		res.json(devicesResponse);
		});
	});
});


app.listen(3005, () => {
 console.log("El servidor está inicializado en el puerto 3005");
 //console.log(res.json(devicesResponse));
});	
