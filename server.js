'use strict'

var http = require('http');
var express = require('express');
var socketio =require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

var waitingPlayer;





app.use(express.static(__dirname + '/client'));

server.listen(8090,function(){console.log("Ready to work")});

io.on('connection',onConnection);

function onConnection(sock){
	sock.emit('msg','Hello! here');
	sock.on('msg', function(txt){
		io.emit('msg',txt); 
		});
		if(waitingPlayer){
			//match Starts
			notifyMatchStarts(waitingPlayer,sock);
			waitingPlayer=null;
			}
		else{
			waitingPlayer = sock ;
			sock.emit('msg','We are waiting for a new player');
		}
	
}

function notifyMatchStarts(sockA,sockB) {
	if(sockA!=sockB){
	[sockA,sockB].forEach(function(sock){sock.emit('msg',"Match Starts")});}

}