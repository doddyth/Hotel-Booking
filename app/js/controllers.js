'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .directive('hotelRating', function () {  //RATING DIRECTIVE
	return {
		restrict: 'A',
		template: '<ul class="rating">' +
					'<li ng-repeat="star in stars" ng-class="star">' +
						'\u2605' +
					'</li>' +
				  '</ul>',
		scope: {
			ratingValue: '=',
			max: '='
		},
		link: function (scope, elem, attrs) {
			var updateStars = function(){
				scope.stars = [];
				for(var i = 0; i < scope.max; i++) {
					scope.stars.push({filled: i < scope.ratingValue});
				}
			};
			scope.$watch('ratingValue', function(oldVal, newVal) {
				if(newVal) {
					updateStars();
				}
			});		
		}
	}
  })
  .controller('NavBarCtrl', ['$scope', '$location', function($scope, $location) { //NAVBAR CONTROLLER
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  }])
  .controller('HomeCtrl', ['$scope', '$location', 'Hotel', function($scope, $location, Hotel){ // HOME CONTROLLER
	$scope.rating = 4;
	$scope.hotel = Hotel.get({hotelId: 'demo_hotel'}, function(hotel) {
	});
	
	$scope.booking = function (roomId) {
            $location.path('/reservation/' + roomId);
        };

	
  }]);