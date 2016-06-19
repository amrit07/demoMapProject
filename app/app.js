'use strict';

// Declare app level module which depends on views, and components
angular.module('demoMapApp', [
  'ngRoute',
  'demoMapApp.controller',
  'demoMapApp.service',
  'filtersModule'
  
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
 
  $routeProvider.when('/',{
    templateUrl:'templates/map.html',
    controller: 'mapController'
  })
  .otherwise({redirectTo: '/'});
}]);
