'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
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
			$scope.startBoxHid = true;
		});

	  $scope.$watch('endDate', function(val) {
	  		$scope.endBoxHid = true;
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
  .controller('BookingFieldCtrl', ['$scope', '$timeout', 'Hotel', 'Sample', function($scope, $timeout, Hotel, Sample){
	  	$scope.isBooked = false;
	  	Hotel.getRoom($scope, 'roomItem', 'Demo-Hotel', $scope.roomId);
	  	$scope.book = function(date, day) {
	  		// console.log(date);
	  		var item = Sample[$scope.roomId][day.toLowerCase()];
			if (item == "enquire") {
				// console.log("ENQUIRE");

				$scope.enquireDate = date;
				$scope.enquireRandNum1 = Math.floor((Math.random()*10)+1);
				$scope.enquireRandNum2 = Math.floor((Math.random()*10)+1);
				
				var enqInfo = {
					enquireDate : date,
					enquireRandNum1 : $scope.enquireRandNum1,
					enquireRandNum2 : $scope.enquireRandNum2
				}
				
				$scope.$emit('updateEnquireInfo', enqInfo);
				$('#myModal').modal({ keyboard:true });
			}
		// $scope.$on('updateStartingTable', function(e, date) {
		// 	init(date);
		// });
  	}
  }])
  .controller('HomeCtrl', ['$scope', '$location', 'Hotel', 'Sample', 'EnquiryService', function($scope, $location, Hotel, Sample, EnquiryService){ // HOME PAGE CONTROLLER
	$scope.rating = 4;
	Hotel.setHotelToScope($scope, 'hotel', 'Demo-Hotel');
	$scope.enquiryData = EnquiryService.addEnquiry($scope, 'enquiryData', 'Demo-Hotel');
	
	$scope.booking = function (roomId, startDate, day) {
		if (day)
			var item = Sample[roomId][day.toLowerCase()];
		if (item == "enquire") {
			// ENQUIRING ROOM {roomId} INFO ON {startDate}
			console.log("ENQUIRE");
			$scope.enquireRoom = roomId;
			$scope.enquireDate = startDate;
			$scope.enquireRandNum1 = Math.floor((Math.random()*10)+1);
			$scope.enquireRandNum2 = Math.floor((Math.random()*10)+1);
			$('#myModal').modal({ keyboard:true });
		} else {
			if (startDate)
				$location.path('/reservation/' + roomId + '/' + startDate);
			else
				$location.path('/reservation/' + roomId);
		}

    };

    $scope.sendEnquiryForm = function () {
		var enquiryForm = $('#myModal');
		var enquirySenderName = $('#nameInput', enquiryForm).val();
		var enquirySenderPhone = $('#phoneInput', enquiryForm).val();
		var enquirySenderEmail = $('#emailInput', enquiryForm).val();
		var enquirySenderMessage = $('#messageInput', enquiryForm).val();
		var enquirySenderCaptcha = $('#captchaInput', enquiryForm).val();

		if (enquirySenderCaptcha == ($scope.enquireRandNum1 + $scope.enquireRandNum2))
		{
			var enquiryItem = {
				name 		: enquirySenderName,
				phone 		: enquirySenderPhone,
				email  		: enquirySenderEmail,
				message 	: enquirySenderMessage,
				dateToAsk 	: $scope.enquireDate,
				roomId 		: $scope.enquireRoom
			};

			$scope.enquiryData.add(enquiryItem);
			enquiryForm.modal('toggle');
		}
	}
  }])
  .controller('ReservationCtrl', ['$scope', '$location', '$routeParams','Hotel', 'Sample', 'BookingService', '$timeout', 'EnquiryService', function($scope, $location, $routeParams ,Hotel, Sample, BookingService, $timeout, EnquiryService){ // RESERVATION PAGE CONTROLLER
	$scope.reservationData = [];
	$scope.errorHide = true;
	$scope.rating = 4;
	$scope.dateCol = [];
  	$scope.dateBooked = [];
	$scope.dateBuyed=[];
	$scope.startDateStr = $routeParams.startDate;
	$scope.amount = [];
	$scope.totalCharge = 0;
	$scope.roomData = [];
	if ($scope.startDateStr) {
		// kalo ada startDate
		var tempCurrDate = new Date();
		var paramDate = new Date($routeParams.startDate);
		if (paramDate < tempCurrDate)
			$scope.startDate = new Date();
		else
			$scope.startDate = new Date($routeParams.startDate);
	} else {
		// kalo ga ada, ambil startDate = todayDate
		$scope.startDate = new Date();
	}
	$scope.endDate = new Date($scope.startDate);
	$scope.endDate.setDate($scope.endDate.getDate()+1);
	$scope.roomId = $routeParams.roomId;
	$scope.arrTimes = [{name: '12.00 PM'},{name: '01.00 PM'}, {name: '02.00 PM'},{name: '03.00 PM'}, {name: '04.00 PM'}, {name: '05.00 PM' }, {name: '06.00 PM' }, {name: '07.00 PM'} ,{name: '08.00 PM'}, {name: '09.00 PM'}, {name: '10.00 PM'}, {name: '11.00 PM'}];
	$scope.arrTime = $scope.arrTimes[7];
	$scope.hears = [{name: 'Internet'},{name: 'Magazine'}, {name: 'Newspaper'},{name: 'Radio'}, {name: 'Television'}, {name: 'Facebook' }, {name: 'Google' }];
	$scope.cards = [{name:'Visa', uri:'img/demo-hotel/card/visa.jpg'}, {name:'Mastercard', uri:'img/demo-hotel/card/mastercard.jpg'}, {name:'JCB', uri:'img/demo-hotel/card/JCB.jpg'}];
	$scope.cardType = $scope.cards[0];
	$scope.numbers = [{number: 1},{number: 2},{number: 3},{number: 4},{number: 5},{number: 6},{number: 7},{number: 8},{number: 9},{number: 10}];
	$scope.roomAmount = $scope.numbers[0];
	Hotel.getRoom($scope, 'room', 'Demo-Hotel', $routeParams.roomId);
	Hotel.setHotelToScope($scope, 'hotel', 'Demo-Hotel');
	Hotel.getRoomExtras($scope, 'roomExtras', 'Demo-Hotel',$routeParams.roomId);
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
	
	$scope.$on('updateTotalCharge', function(e, charge) {
		$scope.totalCharge = charge;
		console.log($scope.totalCharge + "yeah");
	});
	
	$scope.$on('updateRoomData', function(e, roomData) {
		$scope.roomData = roomData;
		console.log($scope.roomData.length);
	});
	
	$scope.$on('updateErrorRoom', function(e, errorHide) {
		$scope.errorHide = errorHide;
	});

	$scope.$on('updateEnquireInfo', function(e, enqInfo) {
		$scope.enquireDate = enqInfo.enquireDate;
		$scope.enquireRandNum1 = enqInfo.enquireRandNum1;
		$scope.enquireRandNum2 = enqInfo.enquireRandNum2;
	});
	
	$scope.bookErrorByEnquire = false;

	$scope.updateBookedDate = function() {
		$scope.dateBooked = [];
		$scope.dateBuyed = [];
		$scope.occupancyAmount = [];
		$scope.bookErrorByEnquire = false;
		$scope.errorHide = true;
		
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
				if (price !== 'enquire') {
					$scope.dateBuyed.push({dateString: myDateStr, date: myDate, prices: price});
					console.log("TEEES");
				}
				else {
					console.log('NOT ENOUGH ROOM ON ' + myDate.toString());
					$scope.bookErrorByEnquire = true;
					$scope.errorHide = false;
					continue;
				}

			}
			else {
				$scope.dateBooked.push({date: myDate, status:false});
			}
  		};
  		// UPDATE PAYMENT LIST
	}

	
	$scope.isError = function(user) {
		if($scope.errorHide == true){
			return false;
		}else{
			return true;
		}
	};
	$scope.reservationData = BookingService.addBooking($scope, 'reservationData', 'Demo-Hotel');
	$scope.newBooking = {};
	$scope.enquiryData = EnquiryService.addEnquiry($scope, 'enquiryData', 'Demo-Hotel');
	
	$scope.formBook = function() {
		if(!$scope.receive) {
			$scope.receive = false;
		}
		console.log($scope.totalCharge);
		$scope.reservationData.add({
			roomName: $scope.room.name,
			bookingDate: new Date().toString(),
			roomData: $scope.roomData,
			startDate: $scope.startDate.toString(),
			endDate: $scope.endDate.toString(),
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			email: $scope.email,
			contactNumber: $scope.contactNumber.toString(),
			organization: $scope.organization,
			addressLine1: $scope.address1,
			addressLine2: $scope.address2,
			city: $scope.city,
			state: $scope.state,
			country: $scope.country,
			postCode: $scope.postcode.toString(),
			arrivalTime: $scope.arrTime.name,
			loyaltyID: $scope.loyaltyID,
			comment: $scope.comment,
			receive: $scope.receive,
			hear: $scope.hear,
			cardType: $scope.cardTypes,
			cardNumber: $scope.cardNumber.toString(),
			cardCCV: $scope.cardCCV.toString(),
			cardUser: $scope.cardUser,
			totalCharge: $scope.totalCharge
		}, function(error){
			if(!error) {
				$('#successModal').modal('show');
			}
		});
		
		//$scope.reservationData.add($scope.newBooking);
		console.log($scope.reservationData);
	}

	$scope.sendEnquiryForm = function () {
		var enquiryForm = $('#myModal');
		var enquirySenderName = $('#nameInput', enquiryForm).val();
		var enquirySenderPhone = $('#phoneInput', enquiryForm).val();
		var enquirySenderEmail = $('#emailInput', enquiryForm).val();
		var enquirySenderMessage = $('#messageInput', enquiryForm).val();
		var enquirySenderCaptcha = $('#captchaInput', enquiryForm).val();

		if (enquirySenderCaptcha == ($scope.enquireRandNum1 + $scope.enquireRandNum2)) {
			var enquiryItem = {
				name 		: enquirySenderName,
				phone 		: enquirySenderPhone,
				email  		: enquirySenderEmail,
				message 	: enquirySenderMessage,
				dateToAsk 	: $scope.enquireDate,
				roomId 		: $scope.roomId
			};

			$scope.enquiryData.add(enquiryItem);
			enquiryForm.modal('toggle');
		}
	}
	var notifModal = $('#successModal');
	notifModal.on('hidden.bs.modal', function () {
			$location.path('/home');
			$scope.$apply();
	});
	$scope.closeNotifBooking = function() {
		notifModal.modal('toggle');
	};
	$scope.updateBookedDate();
  }])
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
	
  }])
  .controller('AdminCtrl', ['$scope', '$location', '$routeParams', 'Hotel', 'Sample', function($scope, $location, $routeParams, Hotel, Sample) {
	
  }]);