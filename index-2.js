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

let data = [false, 1];

    app.get('/light/status', function(req, res) {


		var sql = 'SELECT * FROM status_lights LIMIT 10';

	  	con.query(sql, data, (error, results, fields) => {
	  		if (error){
	    		return console.error(error.message);
	  		}

  		for(i=0; i<result.length; i++){
    		light = { id: result[i].id, name: result[i].name, status: result[i].status, fecha: result[i].date };
    	}

    	res.send(light);

	});


app.listen(3002, () => {
 console.log("El servidor está inicializado en el puerto 3002");
});	
