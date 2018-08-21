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
			$scope.windowA = false;
			$scope.windowB = false;
			$scope.windowC = false;
			$scope.room = false;
			
		//Funciones
			//Envío de Acciones al Arduino
			$scope.sendResponse = function(){
				socket.emit('resp',{
					blowerA: $scope.blowerA, 
					blowerB: $scope.blowerB,
					windowA: $scope.windowA,
					windowB: $scope.windowB,
					windowC: $scope.windowC
				});
			}
			$scope.sendResponseB = function(){
				socket.emit('resptend',{room:$scope.room});
			}
			//Cambio de Estado de botones, según valores booleanos
			$scope.changeText = function(){
				$scope.stateA = ($scope.blowerA)?"Encendido":"Apagado";
				$scope.stateB = ($scope.blowerB)?"Encendido":"Apagado";
				$scope.stwA = ($scope.windowA)?"Abierto":"Cerrado";
				$scope.stwB = ($scope.windowB)?"Abierto":"Cerrado";
				$scope.stwC = ($scope.windowC)?"Abierto":"Cerrado";
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
				}				
				$scope.changeText();
				$scope.sendResponse();
			};
			$scope.windowsOnOff = function(w){
				switch(w){
					case 'A':
						$scope.windowA = !$scope.windowA;
						break;
					case 'B':
						$scope.windowB = !$scope.windowB;
						break;
					case 'C':
						$scope.windowC = !$scope.windowC;
						break;
				}
				$scope.changeText();
				$scope.sendResponse();
			}

			$scope.blowerOnAll = function(){
				$scope.blowerA = true;
				$scope.blowerB = true;
				$scope.changeText();
				$scope.sendResponse();
			}
			$scope.blowerOffAll = function(){
				$scope.blowerA = false;
				$scope.blowerB = false;
				$scope.changeText();
				$scope.sendResponse();
			}

			$scope.windowsOpenAll = function(){
				$scope.windowA = true;
				$scope.windowB = true;
				$scope.windowC = true;
				$scope.changeText();
				$scope.sendResponse();
			}

			$scope.windowsCloseAll = function(){
				$scope.windowA = false;
				$scope.windowB = false;
				$scope.windowC = false;
				$scope.changeText();
				$scope.sendResponse();
			}

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
						$scope.blowerOnAll();
						$scope.windowsOpenAll();
						$scope.changeText();
						$scope.sendResponse();
					}
					if((parseInt(data)<28)&&($scope.auto)){
						$scope.blowerOffAll();
						$scope.windowsCloseAll();
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