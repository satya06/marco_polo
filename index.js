var express = require('express');
var app = express();
var fs = require("fs");
var MarcoPolo = require('./module/MarcoPoloService');


const START = 1;
const END = 1000000;
const NO_LIMIT_IN_LINE = 1000;
const NO_OF_LINE = (END - START + 1) / NO_LIMIT_IN_LINE;

app.get('/', function(req, res, next){
	console.time();
	var stream = fs.createReadStream('output.txt');

    stream.on('error', function(error) {
          res.writeHead(404, 'Not Found');
          res.end();
    });
    stream.on('data', function(data){
    	//console.log('data #'+ data);
	});

	stream.on('end', function(){
    	console.log('end #');

	});

	
    stream.pipe(res);
	console.timeEnd();
});



app.get('/data', function(req, res, next){
	var array = [];
	console.time();
	for( let i = 0 ;i < NO_OF_LINE ; i++){
		var start = START + i*NO_LIMIT_IN_LINE;
		var end = start + NO_LIMIT_IN_LINE ;
		array.push(MarcoPolo.generate(start, end));
		
	}

	Promise.all(array).then(function(data) {
		res.send(data);
	});
	console.timeEnd();	
	
    
});



var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  
  MarcoPolo.createMircoPoloFile('output.txt', function(err){
  	if(err){
  		console.error('Error creating in macro polo file! ');
  		server.close();
  	}
  	console.log('Marco Polo file created Sucessfully ! ');
  });

  console.log("Example app listening at http://%s:%s", host, port)

});
