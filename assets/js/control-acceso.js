var sock = io();
angular.
	module('appArduino').
	component('viewca', {
		templateUrl:'views/control-acceso.html',
		controller: ['$scope','$http', function ($scope, $http){
		//Declaración de Variables
			//Booleanas - Control
            $scope.doorA = false;
            $scope.doorB = false;
            $scope.garageDoorA = false;
            $scope.garageDoorB = false;			
		//Funciones
            //Envío de Acciones al Arduino
            $scope.sendData = function(){
                sock.emit('cadoors',{
                    doorA:$scope.doorA,
                    doorB:$scope.doorB,
                    garageDoorA:$scope.garageDoorA,
                    garageDoorB:$scope.garageDoorB
                });
            }            
            //Cambio de Estado de botones, según valores booleanos
            $scope.openCloseA = function(){
                $scope.doorA = !$scope.doorA;
                $scope.sendData();
            }
            $scope.openCloseB = function(){
                $scope.doorB = !$scope.doorB;
                $scope.sendData();
            }
            $scope.openCloseC = function(){
                $scope.garageDoorA = !$scope.garageDoorA;
                $scope.sendData();
            }
            $scope.openCloseD = function(){
                $scope.garageDoorB = !$scope.garageDoorB;
                $scope.sendData();
            }	
            $scope.closeAll = function(){
                $scope.garageDoorA = false;
                $scope.garageDoorB = false;
                $scope.sendData();
            }	
            $scope.openAll = function(){
                $scope.garageDoorA = true;
                $scope.garageDoorB = true;
                $scope.sendData();
            }
							
		}]
	});