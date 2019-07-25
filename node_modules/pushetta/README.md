# pushetta-npm

Simple node module for interact with Pushetta API.
Pushetta is a cloud API to send push notifications to smartphones and web browsers, look at the site for more informations http://www.pushetta.com

## Sample use

API Key can be obtained registering on Pushetta website.

# Push a message

```javascript
var Pushetta=require("pushetta");
var pushetta = new Pushetta("{API_KEY}");
pushetta.pushMessage("{CHANNEL NAME}", "Hello World");
```

# Subscribe to receive notifications

```javascript
var Pushetta = require('pushetta');
var ptta = new Pushetta("{API_KEY_HERE}");
ptta.subscribe("{CHANNEL NAME}", function (msg) {
	console.log(msg['message']);
});
```

