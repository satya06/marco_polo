var fs = require('fs');
/**
 * @module MarcoPolo 
 */


'use strict';

const START = 1;
const END = 1000000;
const NO_LIMIT_IN_LINE = 1000;
const NO_OF_LINE = (END - START + 1) / NO_LIMIT_IN_LINE;

var Marco_Polo = {

	generate: function(start, end){
		return new Promise(function(resolve, reject){
			var size = end - start;
			var number = [];
			
			for(var i = start ; i < end ; i++ ){
				if( i % 28 === 0 )
					number.push('marcopolo');
				else if( i % 4 === 0 )
					number.push('marco');
				else if( i % 7 === 0 )
					number.push('polo');
				else
					number.push(i);
			}
			
			resolve(number);
		});
	},

	createMircoPoloFile: function(path, cb){
		for( let i = 0 ;i < NO_OF_LINE ; i++){
			var start = START + i*NO_LIMIT_IN_LINE;
			var end = start + NO_LIMIT_IN_LINE ;
			this.generate(start, end).then(function(data){
				fs.appendFile(path, '\n'+data, function(error) {
					if (error) {
					  console.error("write error:  " + error.message);
					  return cb(error);
					} 
				});
			});
		}
		cb(null);
	},


};



/*for( let i = 0 ;i < NO_OF_LINE ; i++){
	var start = START + i*NO_LIMIT_IN_LINE;
	var end = start + NO_LIMIT_IN_LINE ;
	array.push(this.genrate(start, end));
}

Promise.all(array).then(function(data) {
    console.timeEnd();
});*/
module.exports = Marco_Polo;