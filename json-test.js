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
  			for(i=0; i<result.length; i++){
	   			var devicesResponse= {devices: [{id: result[i].id, name: result[i].name, status: result[i].status, fecha: result[i].date}]};
	   			var devicesResponse= {devices: result};
	   			//var devicesResponse = {devices : [{name:'luz 1'},{name: 'luz 2'},{name: 'luz 3'}]};
				console.log(devicesResponse);
	   		}
	   		res.json(devicesResponse);
		});
	});
});


app.listen(3005, () => {
 console.log("El servidor está inicializado en el puerto 3005");
 //console.log(res.json(devicesResponse));
});	
