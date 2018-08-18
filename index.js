
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require("johnny-five");
//var board = new five.Boards([{id:"A", port:"COM4"},{id:"B", port:"COM5"}]);
var board = new five.Board();
app.use(express.static('assets'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*//control arduino
board.on('ready', function(){	
	
	var stemp = new five.Sensor({
		pin: "A0",
		freq: 250,
		board:this.byId("A")
	});
	var pin = new five.Pin({
		pin: 7,
		board: this.byId("A")
	});
		
	var ld = new five.Pin({
		pin: 2,
		board: this.byId("B")
	});	
		
	var datast;
	stemp.on("change",function() {			
		datast = ((this.value)+1)*(5/1024)/0.01;
		console.log(datast);
		io.emit('stemp',datast);

	});
	//Funciones para la comunicación
	io.on('connection', function(socket){
	  console.log('a user connected');

		socket.on('resp', function(data){
			if(data.blower){
				pin.high();
			}else{
				pin.low();
			}
		});
		socket.on('led', function(data){
			if(data.led){
				ld.high();
			}else{
				ld.low();
			}
		});

	});
});*/

board.on('ready', function(){
	
});

//ejecución del Servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});