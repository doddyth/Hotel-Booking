'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource', 'firebase']).
	value('version', '0.1').
  	factory('Hotel', function myService(angularFire) {
		var _url = "https://hotelbooking2.firebaseio.com/Hotels";
		var _ref = new Firebase(_url);
		//console.log(_ref);
		return {
				setHotelToScope: function(scope, localScopeVarName, hotelId){
					var hotelRef = new Firebase(_url + '/' + hotelId);
					angularFire(hotelRef, scope, localScopeVarName);
				},
				getRoom: function(scope, localScopeVarName, hotelId, roomId){
					var roomRef = new Firebase(_url + '/' + hotelId + '/rooms/' + roomId);
					angularFire(roomRef, scope, localScopeVarName);
				},
				getRoomList: function(scope, localScopeVarName, hotelId) {
					var roomListRef = new Firebase(_url + '/' + hotelId + '/rooms');
					angularFire(roomListRef, scope, localScopeVarName);
				},
				getRoomExtras: function(scope, localScopeVarName, hotelId, roomId) {
					var roomRef = new Firebase(_url + '/' + hotelId + '/rooms/' + roomId + '/extras');
					angularFire(roomRef, scope, localScopeVarName);
				}
			}
		}
	)
	.factory('CrossVariable', function () {
		var sharedData = {};

		return {
			getProperty: function (propertyName) {
				console.log(sharedData);
				return sharedData[propertyName];
			},
			setProperty: function (propertyName, value) {
				console.log(sharedData);
				sharedData[propertyName] = value;
			}
		}
	})
	.factory('Sample', function() {
		var _url = "https://hotelbooking2.firebaseio.com/Hotels";
		var _ref = new Firebase(_url);
		return {
	    	"fabulous": {
	      		"mon" : 100000,
	      		"tue" : 123012,
			    "wed" : 102012,
			    "thu" : "enquire",
		      	"fri" : { "price" : 99920, "hot" : true },
		      	"sat" : { "price" : 99920, "hot" : true },
		      	"sun" : 100101
	  		},
	  		"groovy": {
	      		"mon" : 100000,
	      		"tue" : "enquire",
			    "wed" : 102012,
			    "thu" : 99920,
		      	"fri" : 99920,
		      	"sat" : 99920,
		      	"sun" : 100101
	  		},
	  		"marvelous": {
	      		"mon" : 99920,
	      		"tue" : 323512,
			    "wed" : { "price" : 99920, "hot" : true },
			    "thu" : "enquire",
		      	"fri" : 202012,
		      	"sat" : { "price" : 99920, "hot" : true },
		      	"sun" : 100101
	  		},
	  		"splendid": {
	      		"mon" : 100000,
	      		"tue" : 123012,
			    "wed" : 102012,
			    "thu" : "enquire",
		      	"fri" : { "price" : 99920, "hot" : true },
		      	"sat" : 102012,
		      	"sun" : 100101
	  		}
		}
	})
	.factory('loginService', ['angularFireAuth', '$location', '$rootScope',
		function(angularFireAuth, $location, $rootScope) {
		return {
			login: function(email, pass, redirect, callback) {
				var p = angularFireAuth.login('password', {
					email: email,
					password: pass,
					rememberMe: true
				});
				p.then(function(user) {
					if( redirect ) {
						$location.path(redirect);
					}
					callback && callback(null, user);
				}, callback);
			},
			logout: function(redirectPath) {
				angularFireAuth.logout();
				if(redirectPath) {
					$location.path(redirectPath);
				}
			},
		}
	}])
