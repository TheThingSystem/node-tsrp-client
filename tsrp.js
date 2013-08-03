
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var dgram = require('dgram');

var TSRP = function( ) {
	EventEmitter.call(this);	
	var socket = null;	
}
util.inherits(TSRP, EventEmitter);

TSRP.prototype.connect = function ( ) {
	var LOCAL_BROADCAST_HOST = '224.192.32.19';
	var LOCAL_BROADCAST_PORT = 22601
	var self = this;
	
	self.socket = dgram.createSocket('udp4');
	self.socket.bind(LOCAL_BROADCAST_PORT, function() {
	  self.socket.addMembership(LOCAL_BROADCAST_HOST);
	});

	self.socket.on("listening", function() {
		self.emit('connect');
		
	});
	
	self.socket.on("message", function(msg, rinfo) {		
		var json = JSON.parse( msg );
		self.emit( 'report', JSON.stringify(json) );
	
	});	
	
}

TSRP.prototype.disconnect = function ( ) {
	this.socket.close();
	this.emit('disconnect');
	
}

module.exports = TSRP;
