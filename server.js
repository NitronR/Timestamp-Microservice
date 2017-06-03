// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/*', function(request, response) {
	var inp=request.path.substring(1).replace(/%20/g," ");
  	var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
	var match=inp.search(new RegExp("[^0-9]"));
	if(match==-1){
		var d=new Date(parseInt(inp)*1000);
		var jsonO={unix:d.getTime()/1000,natural:months[d.getMonth()]+" "+d.getDate()+","+d.getFullYear()};
    		response.send(jsonO);
  	}else{
		var d = new Date(inp);
		var jsonO={unix:null,natural:null};
		if(!isNaN(d.valueOf())){
			jsonO.unix=d.getTime()/1000;
			jsonO.natural=months[d.getMonth()]+" "+d.getDate()+","+d.getFullYear();
    			response.send(jsonO);
		}else{
    			response.send(jsonO);
		}
	}
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
