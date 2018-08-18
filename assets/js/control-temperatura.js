var socket = io();
angular.
	module('appArduino').
	component('viewtemp', {
		templateUrl:'views/control-temperatura.html',
		controller: ['$scope','$http', function ($scope, $http){
		//Declaración de Variables
			//Cadenas
			$scope.temperatura = "23";
			$scope.humo = "500";
			$scope.humedad = "25";

			//Booleanas - Control
			$scope.auto = true;
			$scope.autoB = true;
			$scope.blowerA = false;
			$scope.blowerB = false;
			$scope.blowerC = false;
			$scope.room = false;
			
		//Funciones
			//Envío de Acciones al Arduino
			$scope.sendResponse = function(){
				socket.emit('resp',{blowerA: $scope.blowerA, blowerB: $scope.blowerB, blowerC: $scope.blowerC});
			}
			$scope.sendResponseB = function(){
				socket.emit('resptend',{room:$scope.room});
			}
			//Cambio de Estado de botones, según valores booleanos
			$scope.changeText = function(){
				$scope.stateA = ($scope.blowerA)?"Encendido":"Apagado";
				$scope.stateB = ($scope.blowerB)?"Encendido":"Apagado";
				$scope.stateC = ($scope.blowerC)?"Encendido":"Apagado";
				$scope.textAuto = ($scope.auto)?"Automático":"Manual";
				$scope.textAutoB = ($scope.autoB)?"Automático":"Manual";
				$scope.roomState = ($scope.room)?"Abierto":"Cerrado";
				
			}	
			//Función Botón "Automático - Mannual"		
			$scope.autoOnOff = function(){
				$scope.auto = !$scope.auto;
				$scope.changeText();
			};
			$scope.autoOnOffB = function(){
				$scope.autoB = !$scope.autoB;
				$scope.changeText();
			};
			//Funciones Botón Encender o Apagar Ventilador
			$scope.blowerOnOff = function(w){
				switch(w){
					case 'A':
						$scope.blowerA = !$scope.blowerA;
						break;
					case 'B':
						$scope.blowerB = !$scope.blowerB;
						break;
					case 'C':
						$scope.blowerC = !$scope.blowerC;
						break;
				}				
				$scope.changeText();
				$scope.sendResponse();
			};
			$scope.roomOnOff = function(){
				$scope.room = !$scope.room;
				$scope.changeText();
				$scope.sendResponseB();
			}
		//Lectura de datos en Arduino
			socket.on('stemp', function(data){
				$scope.$apply(function(){
					$scope.temperatura = parseInt(data)+"";
					if((parseInt(data)>28)&&($scope.auto)){
						//------------
						$scope.changeText();
						$scope.sendResponse();
					}
					if((parseInt(data)<28)&&($scope.auto)){
						//------------
						$scope.changeText();
						$scope.sendResponse();
					}
				});
			});	
			socket.on('stend', function(data){
				$scope.$apply(function(){
					
				});
			});	
		//Inicializacion de algunas funciones		
			$scope.changeText();				
		}]
	});