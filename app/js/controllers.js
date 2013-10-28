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
  .directive('imageCarousel', function ($timeout) {
	return{
		restrict: 'A',
		template: '<ul id="foo">' +
					'<li class="nbs-flexisel-item" ng-repeat="image in hotel.images">' +
						'<img height="140px" width="140px" src="{{image.uri}}" alt="{{image.uri}}"></img>' +
					'</li>' +
				  '</ul>' +
				  '<div class="clearfix"/>',
		scope: false,
		link:function(scope, element){
			var init = function(){
				$('#foo').flexisel({
				visibleItems:5,
					animationSpeed: 500,
					autoPlay: false,
					autoPlaySpeed: 3000,            
					pauseOnHover: true,
					enableResponsiveBreakpoints: true,
					responsiveBreakpoints: { 
						portrait: { 
							changePoint:480,
							visibleItems: 1
						}, 
						landscape: { 
							changePoint:640,
							visibleItems: 2
						},
						tablet: { 
							changePoint:768,
							visibleItems: 3
						}
					}
				});
			};
			$timeout(init, 0);
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
	Hotel.setHotelToScope($scope, 'hotel', 'Demo-Hotel');
	
	$scope.booking = function (roomId) {
            $location.path('/reservation/' + roomId);
        };
  }])
  .controller('ReservationCtrl', ['$scope', '$location', '$routeParams','Hotel', function($scope, $location, $routeParams ,Hotel){ // HOME CONTROLLER
	$scope.rating = 4;
	Hotel.getRoom($scope, 'room', 'Demo-Hotel', $routeParams.roomId);
	Hotel.setHotelToScope($scope, 'hotel', 'Demo-Hotel');
  }]);