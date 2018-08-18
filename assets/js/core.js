
angular.module('appArduino', ['ngRoute']);

angular.
  module('appArduino').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $routeProvider.when('/temperatura', { template: "<viewtemp></viewtemp>" });
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });    
      }
  ]);