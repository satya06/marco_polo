"use strict";
var express = require('express');
var app = express();
var fs = require("fs");
var MarcoPolo = require('./module/MarcoPoloService');
var MarcoPoloData = require('./schema/MarcoPoloData');
var path = require('path');


const START = 1;
const END = 1000000;
const NO_LIMIT_IN_LINE = 1000;
const NO_OF_LINE = (END - START + 1) / NO_LIMIT_IN_LINE;

app.set("view engine", "ejs");
var viewsFolder = __dirname + '/views';
app.set('views', viewsFolder);

app.get('/', function(req, res, next){
  res.render('index', {start: START, end: END, step: NO_LIMIT_IN_LINE});
});

app.get('/get_data/:start', function(req, res, next){
	console.time();
  console.log({numbers: req.params.start + '-' + (parseInt(req.params.start) + NO_LIMIT_IN_LINE)});
  MarcoPoloData.find({numbers: req.params.start + '-' + (parseInt(req.params.start) + NO_LIMIT_IN_LINE)}, function(err, data){
    if(err) throw err;
    console.log(data);
    res.send(data[0].result);
  }); 
});



app.get('/data', function(req, res, next){
	var array = [];
	console.time();
	for( var i = 0 ;i < NO_OF_LINE ; i++){
		var start = START + i*NO_LIMIT_IN_LINE;
		var end = start + NO_LIMIT_IN_LINE ;
		array.push(MarcoPolo.generate(start, end));
		
	}

	Promise.all(array).then(function(data) {
		res.send(data);
	});
	console.timeEnd();	
	
    
});



  MarcoPolo.createMircoPoloFile('output.txt', function(err){
  	if(err){
  		console.error('Error creating in macro polo file! ');
  		server.close();
  	}
  	console.log('Marco Polo file created Sucessfully ! ');
  });
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  

  console.log("Example app listening at http://%s:%s", host, port)

});
