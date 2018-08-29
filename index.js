
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var five = require("johnny-five");
//var board = new five.Boards([{id:"A", port:"COM4"},{id:"B", port:"COM5"}]);
//var board = new five.Board({port: "COM4"});
app.use(express.static('assets'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*//control arduino
board.on('ready', function(){	
	
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

	});
});*/

/*board.on('ready', function(){
//Variables Control Acceso
	var aux = false;
	var puertaG1 = new five.Servo({
		pin: 9,
		startAt: 0,
		board:this.byId("B")
	});
	var puertaG2 = new five.Servo({
		pin: 10,
		startAt: 180,
		board:this.byId("B")
	});
	var puertaA = new five.Servo({
		pin: 8,
		startAt: 180,
		board:this.byId("B")
	});
	var puertaB = new five.Servo({
		pin: 5,
		startAt: 180,
		board:this.byId("B")
	});

	var proximity = new five.Proximity({
		controller: "HCSR04",
		pin: 6,
		board:this.byId("B")
	});
	var proximity2 = new five.Proximity({
		controller: "HCSR04",
		pin: 7,
		board:this.byId("B")
	});
	var buzzer = new five.Pin({
		pin: 11,
		board:this.byId("B")
	});

	//Variables Control Temperatura
	var stemp = new five.Sensor({
		pin: "A0",
		freq: 250,
		board:this.byId("A")
	});
	var cooler1 = new five.Pin({
		pin: 1,
		board: this.byId("A")
	});
	var cooler2 = new five.Pin({
		pin: 2,
		board: this.byId("A")
	});
	var ventana1 = new five.Servo({
		pin: 7,
		startAt: 0,
		board:this.byId("A")
	});
	var ventana2 = new five.Servo({
		pin: 8,
		startAt: 0,
		board:this.byId("A")
	});
		//motores paso a paso
	var alternator1 = new five.Pin({
		pin: 3,
		board: this.byId("A")
	});
	var alternator2 = new five.Pin({
		pin: 4,
		board: this.byId("A")
	});

	//Funciones Control Acceso
	proximity.on("data", function() {
		if(this.cm<50 && !aux ){	
			aux = !aux;		
			io.emit('cadresp', {aux:aux});
		}
	});

	proximity2.on("data", function() {
		if(this.cm<50){		
			io.emit('alarm', this.cm);
		}
	});

	//Funciones Control Temperatura
	var datast;
	stemp.on("change",function() {			
		datast = ((this.value)+1)*(5/1024)/0.01;
		console.log(datast);
		io.emit('stemp',datast);

	});	

	//Funciones para la comunicación
	io.on('connection', function(socket){
		console.log('a user connected');
	//Grupo 2: Control Acceso
		socket.on('cadoors', function(data){
			aux = data.aux; 
			if(data.doorA){
				puertaA.to(90,1000);
			}else{
				puertaA.to(180,1000);
			}
			if(data.doorB){
				puertaB.to(90,1000);
			}else{
				puertaB.to(180,1000);
			}
			if(data.garageDoorA){
				puertaG1.to(90,1000);
			}else{
				puertaG1.to(0,1000);
			}
			if(data.garageDoorB){
				puertaG2.to(90,1000);
			}else{
				puertaG2.to(180,1000);
			}
			if(data.alarm){
				buzzer.high();
			}else{
				buzzer.low();
			}
		});
	//Grupo 1: Control Temperatura
		socket.on('resp', function(data){
			if(data.blowerA){
				cooler1.high();
			}else{
				cooler1.low();
			}
			if(data.blowerB){
				cooler2.high();
			}else{
				cooler2.low();
			}
			if(data.windowA){
				ventana1.to(90,1000);
			}else{
				ventana1.to(0,1000);
			}
			if(data.windowB){
				ventana2.to(90,1000);
			}else{
				ventana2.to(0,1000);
			}
			if(data.windowC){

			}else{

			}
		});
		socket.on('resptend', function(data){
			if(data.room){

			}else{
				
			}
		});
  
	});
});*/

//ejecución del Servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});