'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase',
  'ui.bootstrap',
  'ngResource'
]).
config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/room-list', {templateUrl: 'partials/room-list.html', controller: 'HomeCtrl'});
  $routeProvider.when('/reservation/:roomId', {templateUrl: 'partials/reservation.html', controller: 'ReservationCtrl'});
  $routeProvider.when('/reservation/:roomId/:startDate', {templateUrl: 'partials/reservation.html', controller: 'ReservationCtrl'});
  $routeProvider.when('/admin', {templateUrl: 'partials/admin.html', controller: 'AdminCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
  
});
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
} //End of Config

