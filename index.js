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

var sql = 'SELECT * FROM status_lights LIMIT 10';


module.exports = function() {
  	var data = { lights: [] }
	con.connect(function(err) {
	  	if (err) throw err;
	  	console.log("Connected!");
	  	con.query(sql, data, function (err, result) {
	    	if (err) throw err;

  			for(i=0; i<result.length; i++){
	    		data.lights.push({ id: result[i].id, name: result[i].name, status: result[i].status, fecha: result[i].date })
	    	}
		});
	});
	return data
}