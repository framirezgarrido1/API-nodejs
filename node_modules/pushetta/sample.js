var Pushetta = require('./pushetta');

var ptta = new Pushetta("{API_KEY_HERE}");

ptta.subscribe("WebPush", function (message) {
	console.log(message);
});
