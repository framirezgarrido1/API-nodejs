
var Pushetta=require("../pushetta");
pushetta = new Pushetta("{API_KEY}");

pushetta.subscribe("{CHANNEL NAME}", function(err, msg){
	console.log(msg);
});
