/**
@name toolController.js
@description tool page controller
@version 1.0
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';

	/**
	@name toolController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function statsController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q ,dataservice, errorService){

		var vm = this;

		vm.loadingDisplay = 0;
		vm.typeArray = [];
		vm.statistics = [];


		var url = 'https://elixir.bsc.es/tools/statistics/';
		dataservice.getData(url)
			.then(function (response){
				vm.orderStats(response.data);
			}).catch(function(error){
				vm.createMsg(error.status);
			});

		vm.orderStats = function (statistics){

			for (var stats in statistics) {
				var tt = new Tooltype();
				tt.construct(stats,statistics[stats].total,statistics[stats].operational,statistics[stats].total-statistics[stats].operational);
				vm.statistics.push(tt);
			}
			vm.do();
		}

		vm.do = function () {
		   	//Chart 1
			vm.chart1 = new Chart();
			vm.chart1.setType("pie");
			vm.chart1.setLabel(["Operational","Not operational"]);
			vm.chart1.setColor([ '#97BBCD', '#F7464A']);

			//Chart 1
			vm.chart2 = new Chart();
			vm.chart2.setType("bar");
			vm.populateTypeChart(vm.statistics);

		}


		vm.populateTypeChart = function (object){
			for (var a of object) {
				vm.typeArray.push(a.type)
				if (a.type!="all") {
					vm.chart2.label.push(a.type)
					vm.chart2.data.push(a.operational)
				}
			}
			vm.type=vm.typeArray[0];
			vm.loadingDisplay=1;
		}

		$scope.$watch(()=>vm.type, function(newValue, oldValue){
			if (newValue !== oldValue) {
				for (var j of vm.statistics) {
					Object.keys(j).forEach(function(key) {
						  if (j[key] == newValue) {
						    vm.chart1.setData([j.operational,j.notOperational]);
						  }
					});
				}
			}
		});


		vm.options = {legend: {display: true, position: 'bottom'}};


		/**
		@name createMsg
		@description creates div with error message
		@version 1.0
		@author Vicky Sundesha
		@return messageToDisplay this is the the code that is displayed when there is an error
		*/
		vm.createMsg = function (code){
			vm.loadingDisplay = 2;
			vm.message = errorService.error(code);
		}
	};

	statsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataservice', 'errorService']

	angular
	.module('elixibilitasApp')
	.controller("statsController", statsController);



})();
