'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('roomCharge', ['$timeout', function ($timeout) {
	return {
		scope: {
			val: '=',
			buyed: '=',
			maximum: '=',
			includedAdult: '=',
			includedChildren: '=',
			adultPrice: '=',
			childrenPrice: '=',
			extras: '='
		},	
		link: function(scope, elm, attrs){
			scope.roomCharge = [];
			scope.roomDataCharge = [];
			scope.roomData = [];
			scope.extraCheck = [];
			scope.errorHide = true;
			scope.errorMessage = "";
			scope.occupancyAmount = [];
			scope.guestName = [];
			scope.adult = [];
			scope.children = [];
			scope.infant = [];
			
			scope.personChange = function() {
				var jumlah = 0;
				scope.roomDateCharge = [];
				scope.roomData = [];
				for(var i = 0; i<scope.val.length; i++) {
					scope.roomData.push({roomNumber: i+1, adultCount: scope.adult[i].number, childrenCount: scope.children[i].number, infantCount: scope.infant[i].number, guestName: scope.guestName[i]});
					console.log(scope.roomData[i].adultCount + " " + scope.roomData[i].childrenCount);
					var jumlahOrang = scope.adult[i].number + scope.children[i].number;
					if(jumlahOrang > scope.maximum){
						scope.errorMessage = "This room allows a maximum of " + scope.maximum + " people per room.";
						scope.errorHide = false;
						scope.$emit('updateErrorRoom', scope.errorHide);
					}else{
						scope.errorHide = true;
						scope.$emit('updateRoomData', scope.roomData);
						scope.$emit('updateErrorRoom', scope.errorHide);
					}
					var prices = [];
					for(var j = 0; j < scope.buyed.length; j++) { 
						if(scope.adult[i].number > scope.includedAdult || scope.children[i].number > scope.includedChildren) {
							var selisihAdult = scope.adult[i].number > scope.includedAdult ? scope.adult[i].number - scope.includedAdult : 0;
							var selisihChildren = scope.children[i].number > scope.includedChildren ? scope.children[i].number - scope.includedChildren : 0;
							var adultExtraPrice = scope.adultPrice * selisihAdult;
							var childrenExtraPrice = scope.childrenPrice * selisihChildren;
							var totalDatePrice = scope.buyed[j].prices + adultExtraPrice + childrenExtraPrice;
							prices.push({adultExtraPrice: adultExtraPrice, childrenExtraPrice: childrenExtraPrice, totalDatePrice: totalDatePrice});
							console.log(adultExtraPrice + " " + childrenExtraPrice + " Yeah!");
						}
						else { 
							var totalDatePrice = scope.buyed[j].prices + 0 + 0;
							prices.push({adultExtraPrice: 0, childrenExtraPrice: 0, totalDatePrice: totalDatePrice});
						}
					}
					scope.roomDateCharge.push({prices: prices});
				}
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
											console.log("aergh " + $(deepestChild[m]).html() + jumlah);
										}
									}
								}
							}
						}	
					}
					scope.roomCharge = jumlah;
					scope.roomTaxes = parseInt(scope.val.length*2000);
					scope.serviceCharge = parseInt(0.1 * jumlah);
					//scope.extraCharge = jumlahExtra;
					scope.grandTotal = scope.roomCharge+scope.roomTaxes+scope.serviceCharge+scope.extraCharge;
					scope.$emit('updateTotalCharge', scope.grandTotal);
				});
			};
			scope.$watch("maximum", function(a) {
				scope.adult = [];
				scope.children = [];
				scope.infant = [];
				scope.roomDateCharge = [];
				var jumlah = 0;
				var jumlahExtra = 0;
				for(var i = 0; i<=scope.maximum; i++) {
					scope.occupancyAmount.push({number: i});
				}
				for(var i = 0; i<scope.val.length; i++){
					scope.adult.push(scope.occupancyAmount[1]);
					scope.children.push(scope.occupancyAmount[0]);
					scope.infant.push(scope.occupancyAmount[0]);
					scope.guestName.push("");
				}
				for(var i = 0; i < scope.extras.length; i++) {
					scope.extraCheck.push({name: scope.extras[i].name, value: "false", jumlah: 0});
					//console.log(scope.extraCheck[i].);
				}
				
				for(var i = 0; i<scope.val.length; i++){
					var prices = [];
					for(var j = 0; j < scope.buyed.length; j++) { 
						if(scope.adult[i].number > scope.includedAdult || scope.children[i].number > scope.includedChildren) {
							var selisihAdult = scope.adult[i].number > scope.includedAdult ? scope.adult[i].number - scope.includedAdult : 0;
							var selisihChildren = scope.children[i].number > scope.includedChildren ? scope.children[i].number - scope.includedChildren : 0;
							var adultExtraPrice = scope.adultPrice * selisihAdult;
							var childrenExtraPrice = scope.childrenPrice * selisihChildren;
							var totalDatePrice = scope.buyed[j].prices + adultExtraPrice + childrenExtraPrice;
							prices.push({adultExtraPrice: adultExtraPrice, childrenExtraPrice: childrenExtraPrice, totalDatePrice: totalDatePrice});
							console.log(adultExtraPrice + " " + childrenExtraPrice + " Yeah!");
						}
						else { 
							var totalDatePrice = scope.buyed[j].prices + 0 + 0;
							prices.push({adultExtraPrice: 0, childrenExtraPrice: 0, totalDatePrice: totalDatePrice});
						}
					}
					scope.roomDateCharge.push({prices: prices});
				}
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
											console.log(deepestChild[m]);
											jumlah = jumlah + parseInt($(deepestChild[m]).html());
										}
									}
								}
							}
						}	
					}
					if(scope.extras){
						for(var i = 0; i < scope.extras.length; i++){
							var jumlahHarga = 0;
							var status = "";
							if(scope.extraCheck[i].value == true) { 
								for(var j = 0; j < scope.extras[i].status_pricing.length; j++) {
									if(scope.extras[i].status_pricing[j].name == "room") {
										status = "room";
										jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.val.length); 
									}
									if(scope.extras[i].status_pricing[j].name == "booking") {
										status = "booking"
										jumlahHarga = jumlahHarga + scope.extras[i].price;
									}
									if(scope.extras[i].status_pricing[j].name == "night") {
										if(status == "room"){
											jumlahHarga = jumlahHarga * scope.buyed.length;
										}
										else {
											jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.buyed.length);
										}
										status = "night";
									}
								}
								jumlahExtra = jumlahExtra + jumlahHarga;
								scope.extraCheck[i].jumlah = jumlahHarga;
								console.log(scope.extraCheck[i].jumlah);
							} else {
								scope.extraCheck[i].jumlah = 0;
							}
						}
					}
					scope.roomCharge = jumlah;
					scope.roomTaxes = parseInt(scope.val.length*2000);
					scope.serviceCharge = parseInt(0.1 * jumlah);
					scope.extraCharge = jumlahExtra;
					scope.grandTotal = scope.roomCharge+scope.roomTaxes+scope.serviceCharge+scope.extraCharge;
					scope.$emit('updateTotalCharge', scope.grandTotal);
				});
			}),
			scope.$watch('val', function(value) {
				scope.roomDateCharge = [];
				var jumlah = 0;
				var jumlahExtra = 0;
				if(scope.val.length < scope.adult.length)
				{
					console.log("kurang (sebelum)" + scope.children.length);
					for(var i = (scope.adult.length - scope.val.length)-1; i >= 0 ; i--) {
						scope.adult.pop();
						scope.children.pop();
						scope.infant.pop();
						scope.roomData.pop();
					}
				} else {
					var selisih = scope.val.length - scope.adult.length;
					for(var i = 0; i < selisih ; i++) {
						console.log("selisihnya= " + (scope.val.length - scope.adult.length) + "index=" + i);
						scope.adult.push(scope.occupancyAmount[1]);
						scope.children.push(scope.occupancyAmount[0]);
						scope.infant.push(scope.occupancyAmount[0]);
						scope.guestName.push("");
					}
				}
				
				for(var i = 0; i<scope.val.length; i++){
					var prices = [];
					for(var j = 0; j < scope.buyed.length; j++) { 
						if(scope.adult[i].number > scope.includedAdult || scope.children[i].number > scope.includedChildren) {
							var selisihAdult = scope.adult[i].number > scope.includedAdult ? scope.adult[i].number - scope.includedAdult : 0;
							var selisihChildren = scope.children[i].number > scope.includedChildren ? scope.children[i].number - scope.includedChildren : 0;
							var adultExtraPrice = scope.adultPrice * selisihAdult;
							var childrenExtraPrice = scope.childrenPrice * selisihChildren;
							var totalDatePrice = scope.buyed[j].prices + adultExtraPrice + childrenExtraPrice;
							prices.push({adultExtraPrice: adultExtraPrice, childrenExtraPrice: childrenExtraPrice, totalDatePrice: totalDatePrice});
							console.log(adultExtraPrice + " " + childrenExtraPrice + " Yeah!");
						}
						else { 
							var totalDatePrice = scope.buyed[j].prices + 0 + 0;
							prices.push({adultExtraPrice: 0, childrenExtraPrice: 0, totalDatePrice: totalDatePrice});
						}
					}
					scope.roomDateCharge.push({prices: prices});
				}
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
											console.log(deepestChild[m]);
											jumlah = jumlah + parseInt($(deepestChild[m]).html());
										}
									}
								}
							}
						}	
					}
					if(scope.extras){
						for(var i = 0; i < scope.extras.length; i++){
							var jumlahHarga = 0;
							var status = "";
							if(scope.extraCheck[i].value == true) { 
								for(var j = 0; j < scope.extras[i].status_pricing.length; j++) {
									if(scope.extras[i].status_pricing[j].name == "room") {
										status = "room";
										jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.val.length); 
									}
									if(scope.extras[i].status_pricing[j].name == "booking") {
										status = "booking"
										jumlahHarga = jumlahHarga + scope.extras[i].price;
									}
									if(scope.extras[i].status_pricing[j].name == "night") {
										if(status == "room"){
											jumlahHarga = jumlahHarga * scope.buyed.length;
										}
										else {
											jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.buyed.length);
										}
										status = "night";
									}
								}
								jumlahExtra = jumlahExtra + jumlahHarga;
								scope.extraCheck[i].jumlah = jumlahHarga;
								console.log(scope.extraCheck[i].jumlah);
							} else {
								scope.extraCheck[i].jumlah = 0;
							}
						}
					}
					scope.roomCharge = jumlah;
					scope.roomTaxes = parseInt(scope.val.length*2000);
					scope.serviceCharge = parseInt(0.1 * jumlah);
					scope.extraCharge = jumlahExtra;
					scope.grandTotal = scope.roomCharge+scope.roomTaxes+scope.serviceCharge+scope.extraCharge;
					scope.$emit('updateTotalCharge', scope.grandTotal);
				});
			}, true);
			scope.$watch('buyed', function(value) {
				scope.roomDateCharge = [];
				var jumlah = 0;
				var jumlahExtra = 0;
				for(var i = 0; i<scope.val.length; i++){
				var prices = [];
				for(var j = 0; j < scope.buyed.length; j++) { 
					if(scope.adult[i].number > scope.includedAdult || scope.children[i].number > scope.includedChildren) {
						var selisihAdult = scope.adult[i].number > scope.includedAdult ? scope.adult[i].number - scope.includedAdult : 0;
						var selisihChildren = scope.children[i].number > scope.includedChildren ? scope.children[i].number - scope.includedChildren : 0;
						var adultExtraPrice = scope.adultPrice * selisihAdult;
						var childrenExtraPrice = scope.childrenPrice * selisihChildren;
						var totalDatePrice = scope.buyed[j].prices + adultExtraPrice + childrenExtraPrice;
						prices.push({adultExtraPrice: adultExtraPrice, childrenExtraPrice: childrenExtraPrice, totalDatePrice: totalDatePrice});
						console.log(adultExtraPrice + " " + childrenExtraPrice + " Yeah!");
					}
					else { 
						var totalDatePrice = scope.buyed[j].prices + 0 + 0;
						prices.push({adultExtraPrice: 0, childrenExtraPrice: 0, totalDatePrice: totalDatePrice});
					}
				}
				scope.roomDateCharge.push({prices: prices});
				}
					
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
					if(scope.extras){
						for(var i = 0; i < scope.extras.length; i++){
							var jumlahHarga = 0;
							var status = "";
							if(scope.extraCheck[i].value == true) { 
								for(var j = 0; j < scope.extras[i].status_pricing.length; j++) {
									if(scope.extras[i].status_pricing[j].name == "room") {
										status = "room";
										jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.val.length); 
									}
									if(scope.extras[i].status_pricing[j].name == "booking") {
										status = "booking"
										jumlahHarga = jumlahHarga + scope.extras[i].price;
									}
									if(scope.extras[i].status_pricing[j].name == "night") {
										if(status == "room"){
											jumlahHarga = jumlahHarga * scope.buyed.length;
										}
										else {
											jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.buyed.length);
										}
										status = "night";
									}
								}
								jumlahExtra = jumlahExtra + jumlahHarga;
								scope.extraCheck[i].jumlah = jumlahHarga;
								console.log(scope.extraCheck[i].jumlah);
							} else {
								scope.extraCheck[i].jumlah = 0;
							}
						}
					}
					scope.roomCharge = jumlah;
					scope.roomTaxes = parseInt(scope.val.length*2000);
					scope.serviceCharge = parseInt(0.1 * jumlah);
					scope.extraCharge = jumlahExtra;
					scope.grandTotal = scope.roomCharge+scope.roomTaxes+scope.serviceCharge+scope.extraCharge;
					scope.$emit('updateTotalCharge', scope.grandTotal);
				});
			},true);
			scope.selectedExtra = function() {
				var jumlah = 0;
				var jumlahExtra = 0;
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
					for(var i = 0; i < scope.extras.length; i++){
						var jumlahHarga = 0;
						var status = "";
						if(scope.extraCheck[i].value == true) { 
							for(var j = 0; j < scope.extras[i].status_pricing.length; j++) {
								if(scope.extras[i].status_pricing[j].name == "room") {
									status = "room";
									jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.val.length); 
								}
								if(scope.extras[i].status_pricing[j].name == "booking") {
									status = "booking"
									jumlahHarga = jumlahHarga + scope.extras[i].price;
								}
								if(scope.extras[i].status_pricing[j].name == "night") {
									if(status == "room"){
										jumlahHarga = jumlahHarga * scope.buyed.length;
									}
									else {
										jumlahHarga = jumlahHarga + (scope.extras[i].price * scope.buyed.length);
									}
									status = "night";
								}
							}
							jumlahExtra = jumlahExtra + jumlahHarga;
							scope.extraCheck[i].jumlah = jumlahHarga;
							console.log(scope.extraCheck[i].jumlah);
						}else {
							scope.extraCheck[i].jumlah = 0;
						}
					}
					scope.roomCharge = jumlah;
					scope.roomTaxes = parseInt(scope.val.length*2000);
					scope.serviceCharge = parseInt(0.1 * jumlah);
					scope.extraCharge = jumlahExtra;
					scope.grandTotal = scope.roomCharge+scope.roomTaxes+scope.serviceCharge+scope.extraCharge;
					scope.$emit('updateTotalCharge', scope.grandTotal);
				},100);
			}
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
  .directive('priceColumn', ['Sample', '$timeout', function (Sample, $timeout) {
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
				$($('.enquire-popup').parent().parent().parent()).popover('destroy');
	  			}
  			});

			var init = function(){
  				$('.hover-div').popover({
		          placement: 'bottom',
		          html: true,
		          title: "<b> Room Information </b>",
		          trigger: 'hover'
		        });
		        // console.log("directive priceColumn " + scope.price);
				$($('.enquire-popup').parent().parent().parent()).popover('destroy');
  			};
			$timeout(init, 0);// console.log(attrs.$attr);
  			// console.log(attrs.$attr);
  		}
  	}
  }])
  .directive('imageCarousel', function ($timeout) {
	return{
		restrict: 'A',
		template: '<div id="imageCarouselSlider">' +
					'<div class="carousel-img-item" ng-repeat="image in val">' +
						'<img class="img-thumbnail" src="{{image.uri}}" alt="{{image.uri}}" ng-click="showOnImgModal($index)"></img>' +
				  	'</div>' +
				  '</div>' +
				  '<div class="clearfix"/>',
		scope: {
			val : '='
		},
		link:function(scope, element){

			scope.showOnImgModal = function(index) {
				console.log(index);

				scope.$emit('imgModalIndexUpdated', index);

				$('#imgModal').modal({ keyboard:true });
			}

			scope.$watch('val', function(newValue, oldValue) {
				if (newValue) {
					// console.log("VAL " + scope.val)
					scope.$emit('hotelImagesInit', scope.val);
					init();


				}
				// else
					// console.log("OLDVAL " + scope.val)

			}, true);

			var init = function(){
				$("#imageCarouselSlider").FlowSlider({
					marginStart:0,
					marginEnd:0,
					position: 0.0,
	                controllers: ["HoverCenter"],
	                controllerOptions: [{
	                    center: 100,
	                    mouseStart: 300,
	                    mouseEnd: 100
	                }]
	            });

	            scope.$emit('imgModalIndexUpdated', 0);
			};
		}
	}	
  });
