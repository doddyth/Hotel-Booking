'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .directive('roomCharge', ['$timeout', function ($timeout) {
	return {
		scope: {
			val: '=',
			buyed: '=',
			maximum: '=',
			included: '='
		},	
		link: function(scope, elm, attrs){
			scope.occupancyAmount = [];
			scope.$watch("maximum", function(a) {
				console.log(scope.maximum);
				for(var i = 0; i<=scope.maximum; i++) {
					scope.occupancyAmount.push({number: i});
				}
			})
			
			scope.$watch('val', function(value) {
				var jumlah = 0;
				$timeout(function() {
					var child = elm.children();
					for(var i = 0; i< child.length; i++){
						var thisElementChild = $(child[i]).children();
						for(var j = 0; j < thisElementChild.length; j++){
							var roomChargeChild = $(thisElementChild[j]).children();
							for(var k = 0; k < roomChargeChild.length; k++) {
								var deepChild = $(roomChargeChild[k]).children();
								for(var l = 0; l < deepChild.length; l++) {
									var deepestChild = $(deepChild[l]).children();
									for(var m = 0; m < deepestChild.length; m++) {
										if($(deepestChild[m]).hasClass('roomCharge'))
										{
											jumlah = jumlah + parseInt($(deepestChild[m]).html());
										}
									}
								}
							}
						}	
					}
					scope.roomCharge = jumlah;
					scope.roomTaxes = parseInt(scope.val.length*2000);
					scope.serviceCharge = parseInt(0.1 * jumlah);
					scope.grandTotal = scope.roomCharge+scope.roomTaxes+scope.serviceCharge;
				});
			}, true);
			scope.$watch('buyed', function(value) {
				var jumlah = 0;
				$timeout(function() {
					var child = elm.children();
					for(var i = 0; i< child.length; i++){
						var thisElementChild = $(child[i]).children();
						for(var j = 0; j < thisElementChild.length; j++){
							var roomChargeChild = $(thisElementChild[j]).children();
							for(var k = 0; k < roomChargeChild.length; k++) {
								var deepChild = $(roomChargeChild[k]).children();
								for(var l = 0; l < deepChild.length; l++) {
									var deepestChild = $(deepChild[l]).children();
									for(var m = 0; m < deepestChild.length; m++) {
										if($(deepestChild[m]).hasClass('roomCharge'))
										{
											jumlah = jumlah + parseInt($(deepestChild[m]).html());
											console.log(jumlah);
										}
									}
								}
							}
						}	
					}
					scope.roomCharge = jumlah;
					scope.roomTaxes = parseInt(scope.val.length*2000);
					scope.serviceCharge = parseInt(0.1 * jumlah);
					scope.grandTotal = scope.roomCharge+scope.roomTaxes+scope.serviceCharge;
				});
			}, true);
		}
	}
  }])
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
  .directive('priceColumn', ['Sample', function (Sample) {
  	return {
  		restrict: 'A',
  		template: 
  			'<span ng-switch on="price" ng-class="{hotPrice:hot}">' + 
	  			'<a ng-switch-when="enquire" class="enquire-popup"> {{price}} </a>' + 
	  			'<a ng-switch-default> {{price | number}} </a>' + 
  			'</span>' +
  			'<span ng-if="hot" class="hot-notification">' +
  			'HOT ! </span>',
  		scope: {
  			day: '@',
  			room: '@'
  		},
  		link: function (scope, elem, attrs) {
  			attrs.$observe('room', function(value) {
  				if (value) {
	  				var item = Sample[value][scope.day];
		  			if (typeof item === 'object') {
		  				scope.price = item.price;
		  				if (item.hot)
		  					scope.hot = true;
		  			}
		  			else
		  				scope.price = item;
	  			}
  			});


  			// console.log(attrs.$attr);
  		}
  	}
  }])
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
  .controller('NavBarCtrl', ['$scope', '$location', function($scope, $location) { //NAVBAR WIDGET CONTROLLER
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  }])
  .controller('PriceTableCtrl', ['$scope', '$location', 'Hotel', function($scope, $location, Hotel) {
  	$scope.dateArray = [];
  	$scope.dateStrArray = [];
  	$scope.todayDate = new Date();
  	$scope.visualBook = [];
  	if ($scope.roomId) {
		Hotel.getRoom($scope, 'roomItem', 'Demo-Hotel', $scope.roomId);
  	} else
		Hotel.getRoomList($scope, 'roomList', 'Demo-Hotel');

	//console.log($scope.roomList[$scope.roomId]);
  	$scope.book = function (index) {
  		console.log($scope.startDate);
  		console.log($scope.endDate);

  		// $scope.$emit('updat eStartDate', "aha");
  	}

  	$scope.dateToYMD = function (date, format) {
		var weekday = new Array(7);
		
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var monthName = new Array(12);
		monthName[0] = "January";
		monthName[1] = "February";
		monthName[2] = "March";
		monthName[3] = "April";
		monthName[4] = "May";
		monthName[5] = "June";
		monthName[6] = "July";
		monthName[7] = "August";
		monthName[8] = "September";
		monthName[9] = "October";
		monthName[10] = "November";
		monthName[11] = "Desember";

	    var d = date.getDate();
	    var m = date.getMonth() + 1;
	    var y = date.getFullYear();
	    var day = date.getDay();
	    if (format == "String")
	    	return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);	
	    else if (format == "Object")
	    	return { 
	    		date: (d <= 9 ? '0' + d : d), 
	    		month: (monthName[m-1]).substring(0,3), 
	    		year: y, 
	    		day: (weekday[day]).substring(0,3), 
	    		weekday: (day == 0 || day == 6 ? true : false) }
  	}

  	var init = function (dateParam) {
  		if (dateParam) {
  			$scope.dateArray = [];
  			$scope.dateStrArray = [];	
  			$scope.visualBook = [];
  		}

  		for (var i = 0; i < 14; i++) {
  			if($scope.startDate)
				var myDate = new Date($scope.startDate);
  			else
				var myDate = new Date($scope.todayDate);
			myDate.setDate(myDate.getDate()+i);
			var myDateStr = $scope.dateToYMD(myDate, "String");
			var myDateObj = $scope.dateToYMD(myDate, "Object");
			$scope.dateStrArray.push(myDateStr);
			$scope.dateArray.push(myDateObj);
			if (dateParam) {
				$scope.visualBook.push($scope.dateBooked[i]['status']);
			}
  		};
  	}

  	init();

  	$scope.$on('updateStartingTable', function(e, date) {
  		init(date);
  		// console.log($scope.dateBooked)
	});

	$scope.$on('updateEndingTable', function(e, date) {
		init(date);
	});
  }])
  .controller('DatePickerCtrl', ['$scope', function($scope) {
  	  $scope.today = function() {
	    $scope.dt = new Date();
	    var tempDate = new Date($scope.startDate);
	  	tempDate.setDate($scope.startDate.getDate() + 1);
	  			
	    $scope.endDateBound = tempDate;
	  };
	  $scope.today();

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = ( $scope.minDate ) ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function() {
	    $timeout(function() {
	      $scope.opened = true;
	    });
	  };

	  $scope.dateOptions = {
	    'year-format': "'yy'",
	    'starting-day': 1
	  };

	  $scope.$watch('startDate', function(val) {
  			var tempDate = new Date($scope.startDate);
  			tempDate.setDate($scope.startDate.getDate() + 1);
  			$scope.endDateBound = tempDate;
	  		
	  		if ($scope.startDate >= $scope.endDate) {
	  			$scope.endDate = tempDate;
	  		}

			$scope.$emit('updateStartDate', val);
		});

	  $scope.$watch('endDate', function(val) {
			$scope.$emit('updateEndDate', val);
		});

	  $scope.startBoxHid = true;
	  $scope.endBoxHid = true;
	  
	  
		$scope.updateAmount = function(){
			for(var i = $scope.amount.length - 1; i >= 0; i--) {
				$scope.amount.splice(i,1);
			}
			for(var i = 0; i<$scope.roomAmount.number;i++)
			{
				$scope.amount.push({index: i, adult:$scope.numbers[0] , children: $scope.numbers[0], infant: $scope.numbers[0]});
			}
		}
		$scope.updateAmount();
  }])
  .controller('BookingFieldCtrl', ['$scope', 'Hotel', 'Sample',
  	function($scope, Hotel, Sample){
	  	$scope.isBooked = false;
	  	Hotel.getRoom($scope, 'roomItem', 'Demo-Hotel', $scope.roomId);
	  	$scope.book = function(date, day) {
	  		var item = Sample[$scope.roomId][day.toLowerCase()];
			if (item == "enquire") 
				console.log("ENQUIRE");

		// $scope.$on('updateStartingTable', function(e, date) {
		// 	init(date);
		// });
  	}
  }])
  .controller('HomeCtrl', ['$scope', '$location', 'Hotel', 'Sample', 
  	function($scope, $location, Hotel, Sample){ // HOME PAGE CONTROLLER
	$scope.rating = 4;
	Hotel.setHotelToScope($scope, 'hotel', 'Demo-Hotel');
	
	$scope.booking = function (roomId, startDate, day) {
		if (day)
			var item = Sample[roomId][day.toLowerCase()];
		if (item == "enquire") {
			// ENQUIRING ROOM {roomId} INFO ON {startDate}
			console.log("ENQUIRE");
		} else {
			if (startDate)
				$location.path('/reservation/' + roomId + '/' + startDate);
			else
				$location.path('/reservation/' + roomId);
		}

    };
  }])
  
  .controller('ReservationCtrl', ['$scope', '$location', '$routeParams','Hotel', 'Sample', function($scope, $location, $routeParams ,Hotel, Sample){ // RESERVATION PAGE CONTROLLER
	$scope.rating = 4;
	$scope.dateCol = [];
  	$scope.dateBooked = [];
	$scope.dateBuyed=[];
	$scope.startDateStr = $routeParams.startDate;
	$scope.amount = [];
	$scope.dateToYMD = function (date, format) {
		var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var monthName = new Array(12);
		monthName[0] = "January";
		monthName[1] = "February";
		monthName[2] = "March";
		monthName[3] = "April";
		monthName[4] = "May";
		monthName[5] = "June";
		monthName[6] = "July";
		monthName[7] = "August";
		monthName[8] = "September";
		monthName[9] = "October";
		monthName[10] = "November";
		monthName[11] = "Desember";

	    var d = date.getDate();
	    var m = date.getMonth() + 1;
	    var y = date.getFullYear();
	    var day = date.getDay();
	    if (format == "String")
	    	return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);	
	    else if (format == "Object")
	    	return { 
	    		date: (d <= 9 ? '0' + d : d), 
	    		month: (monthName[m-1]).substring(0,3), 
	    		year: y, 
	    		day: (weekday[day]).substring(0,3), 
	    		weekday: (day == 0 || day == 6 ? true : false) }
  	}
	if ($scope.startDateStr) {
		// kalo ada startDate
		$scope.startDate = new Date($routeParams.startDate);
	} else {
		// kalo ga ada, ambil startDate = todayDate
		$scope.startDate = new Date();
	}
	$scope.endDate = new Date($scope.startDate);
	$scope.endDate.setDate($scope.endDate.getDate()+1);
	$scope.roomId = $routeParams.roomId;

	Hotel.getRoom($scope, 'room', 'Demo-Hotel', $routeParams.roomId);
	
	Hotel.setHotelToScope($scope, 'hotel', 'Demo-Hotel');

	$scope.arrTimes = [{name: '12.00 PM'},{name: '01.00 PM'}, {name: '02.00 PM'},{name: '03.00 PM'}, {name: '04.00 PM'}, {name: '05.00 PM' }, {name: '06.00 PM' }, {name: '07.00 PM'} ,{name: '08.00 PM'}, {name: '09.00 PM'}, {name: '10.00 PM'}, {name: '11.00 PM'}];
	$scope.arrTime = $scope.arrTimes[7];
	
	$scope.hears = [{name: 'Internet'},{name: 'Magazine'}, {name: 'Newspaper'},{name: 'Radio'}, {name: 'Television'}, {name: 'Facebook' }, {name: 'Google' }];
	
	$scope.cards = [{name:'Visa', uri:'img/demo-hotel/card/visa.jpg'}, {name:'Mastercard', uri:'img/demo-hotel/card/mastercard.jpg'}, {name:'JCB', uri:'img/demo-hotel/card/JCB.jpg'}];
	$scope.cardType = $scope.cards[0];

	$scope.numbers = [{number: 1},{number: 2},{number: 3},{number: 4},{number: 5},{number: 6},{number: 7},{number: 8},{number: 9},{number: 10}];
	$scope.roomAmount = $scope.numbers[0];
	
	$scope.$on('updateStartDate', function(e, date) {
		$scope.startDate = date;
		// console.log($scope.startDate);
		$scope.updateBookedDate();
		$scope.$broadcast('updateStartingTable', $scope.startDate );
	});

	$scope.$on('updateEndDate', function(e, date) {
		$scope.endDate = date;
		// console.log($scope.endDate);
		$scope.updateBookedDate();
		$scope.$broadcast('updateEndingTable', $scope.endDate );
	});
	
	$scope.updateBookedDate = function() {
		$scope.dateBooked = [];
		$scope.dateBuyed = [];
		$scope.occupancyAmount = [];
		for (var i = 0; i < 14; i++) {
  			if($scope.startDate)
				var myDate = new Date($scope.startDate);
  			myDate.setDate(myDate.getDate()+i);
			var myDateStr = $scope.dateToYMD(myDate, "Object");
			var item = Sample[$scope.roomId][myDateStr.day.toLowerCase()]
			
			if (typeof item === 'object') {
				var price = item.price;
		  	}
			else{
				var price = item;
			}
			if (myDate >= $scope.startDate && myDate < $scope.endDate){
				$scope.dateBooked.push({date: myDate, status:true});
				$scope.dateBuyed.push({dateString: myDateStr, date: myDate, prices: price});
			}
			else
				$scope.dateBooked.push({date: myDate, status:false});
  		};
		
  		// UPDATE PAYMENT LIST
	}
	
	Hotel.getRoomExtras($scope, 'roomExtras', 'Demo-Hotel',$routeParams.roomId);
	
	/*var roomChargeChild = $('.roomChargeTBody');
	var thisElementChild = $(roomChargeChild[1]).children();
	console.log(roomChargeChild.html());
	for(var i = 0; i< roomChargeChild.length; i++){
		var thisElementChild = $(roomChargeChild[i]).children();
	}*/
	$scope.updateBookedDate();
	
	$scope.isError = function(user) {
		return angular.equals(user, $scope.master);
	};
  }]);