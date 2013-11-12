'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/reservation/:roomId', 
    {templateUrl: 'partials/reservation.html', controller: 'ReservationCtrl'});
  $routeProvider.when('/reservation/:roomId/:startDate', 
    {templateUrl: 'partials/reservation.html', controller: 'ReservationCtrl'});
  $routeProvider.when('/admin', {templateUrl: 'partials/admin.html', controller: 'AdminCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
  }]);
