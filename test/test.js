
var http = require('http');
var util = require('util');
var TSRP = require('../tsrp');

var monitor = new TSRP();
monitor.connect();

monitor.on('connect', function( event ) {
	console.log( "connect" );
});

monitor.on('report', function( event ) {
	console.log( "message = " + util.inspect(event, {"depth": null}) );
});
