var sock = io();
angular.
	module('appArduino').
	component('viewca', {
		templateUrl:'views/control-acceso.html',
		controller: ['$scope','$http','$timeout', function ($scope, $http, $timeout){
		//Declaración de Variables
            //Booleanas - Control
            $scope.aux = false;
            $scope.doorA = false;
            $scope.doorB = false;
            $scope.garageDoorA = false;
            $scope.garageDoorB = false;	
            $scope.auto = false;
            $scope.lock = false;
            $scope.alarm = false;
            //Inicialización de variables de texto
            $scope.autotxt = ($scope.auto)?"Automático":"Manual";
            $scope.security = ($scope.lock)?"Activada":"Apagada";
            $scope.activate = ($scope.alarm)?"¡Alerta!":"Apagado";		
		//Funciones
            //Envío de Acciones al Arduino
            $scope.sendData = function(){
                sock.emit('cadoors',{
                    doorA:$scope.doorA,
                    doorB:$scope.doorB,
                    garageDoorA:$scope.garageDoorA,
                    garageDoorB:$scope.garageDoorB,
                    alarm:$scope.alarm,
                    aux:$scope.aux
                });
            }

            //Cambio de Estado de botones, según valores booleanos            	
            $scope.closeAll = function(){
                $scope.garageDoorA = false;
                $scope.garageDoorB = false;
                $scope.sendData();
            }	
            $scope.autoOnOff = function(){
                $scope.auto = !$scope.auto;
                $scope.autotxt = ($scope.auto)?"Automático":"Manual";
                $scope.closeAll();
            }
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
            $scope.openAll = function(){
                $scope.garageDoorA = true;
                $scope.garageDoorB = true;
                $scope.sendData();
            }
			$scope.alarmOnOff = function(){
                $scope.lock = !$scope.lock;
                $scope.security = ($scope.lock)?"Activada":"Apagada";
            }	
            $scope.alertOnOff = function(){
                $scope.alarm = !$scope.alarm;
                $scope.activate = ($scope.alarm)?"¡Alerta!":"Apagado";  
                $scope.sendData();
            }
            sock.on('cadresp', function(data){
				$scope.$apply(function(){
                    $scope.aux = data.aux;
                    $scope.openAll();
                    $scope.sendData();
                    $timeout(function(){
                        $scope.aux = false;
                        $scope.closeAll();
                        $scope.sendData();
                    },5000);
				});
            });	
            sock.on('alarm', function(data){
				$scope.$apply(function(){
                    if($scope.lock && !$scope.alarm){
                        $scope.alertOnOff();
                    }
				});
			});
		}]
	});