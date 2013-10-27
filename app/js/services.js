'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource', 'firebase']).
  value('version', '0.1').
  factory('Hotel', function myService(angularFire) {
		var _url = "https://hotelbooking.firebaseio.com/Hotels";
		var _ref = new Firebase(_url);
		
		return {
				setHotelToScope: function(scope, localScopeVarName, hotelId){
					var hotelRef = new Firebase(_url + '/' + hotelId);
					angularFire(hotelRef, scope, localScopeVarName);
				},
				getRoom: function(scope, localScopeVarName, hotelId, roomId){
					var roomRef = new Firebase(_url + '/' + hotelId + '/rooms/' + roomId);
					angularFire(roomRef, scope, localScopeVarName);
				}
		}
	}
  );