
var http = require('http');
var mqtt = require('mqtt');

//  Endpoints
var HOST_ENDPOINT = 'api.pushetta.com';
var MQTT_ENDPOINT = 'mqtt://iot.pushetta.com';
  
var Pushetta = function(apikey) {
  this.apikey = apikey;
}

Pushetta.prototype.pushMessage = function(channelName, message, callback) {
  
  if (typeof channelName !== 'string') {
    callback(new Error('channelName must be string'), false);
  }

  var postData ={
      "body": message,
      "message_type": "text/plain"
  };
  var postdataString = JSON.stringify(postData);

  console.log("api key : "  + this.apikey);
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': postdataString.length,
    'Authorization': 'Token ' + this.apikey
    };

  var options = {
    host: HOST_ENDPOINT,
    port: 80,
    path: ["/api/pushes/", channelName, "/"].join(""),
    method: 'POST',
    headers: headers
  };
  
  var req = http.request(options, function(res) {
    res.on('end', function() {
      console.log("END");
      callback(null, true);
    });
  }).on('error', function(err){
      callback(err, false);
  });

  req.write(postdataString);
  req.end();
}

Pushetta.prototype.subscribe = function(channelName, callback) {
  if (typeof channelName !== 'string') {
    callback(new Error('channelName must be string'), "");
  }

  self = this;

  if(!self._mqtt_client)
    self._mqtt_client = mqtt.connect(MQTT_ENDPOINT, {
      username: this.apikey,
      password: "pushetta" 
  });

  self._mqtt_client.on('connect', function () {
    self._mqtt_client.subscribe(['/pushetta.com/channels/', channelName].join(""));
  });

  self._mqtt_client.on('message', function (topic, message) {
    var channel = topic.substr(topic.lastIndexOf('/') + 1);
    callback(null,  { 'message' : message.toString(), 'channel' : channel });
  });

}


module.exports = Pushetta
