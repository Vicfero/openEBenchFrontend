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
	function statsController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q ,dataservice){

		var vm = this;


		vm.typeArray = ["Total"];
		vm.type=vm.typeArray[0];


		vm.statistics = new Statistics ();
		var url = 'https://elixir.bsc.es/tools/statistics/';
		dataservice.getData(url)
			.then(function (response){
				var res = response.data;
				vm.statistics.construct(res.total,res.operational,res.cmd,res.web,res.db,res.app,res.lib,res.ontology,res.workflow,res.plugin,res.sparql,res.soap,res.script,res.rest,res.workbench,res.suite);
				vm.do();
			});


		vm.do = function () {
		   	//Chart 1
			vm.chart1 = new Chart();
			vm.chart1.setType("pie");
			vm.chart1.setLabel(["Operational","Not operational"]);
			vm.chart1.setData([vm.statistics.operational,vm.statistics.notOperational]);
			vm.chart1.setColor([ '#97BBCD', '#F7464A']);
			vm.chart2 = new Chart();
			vm.chart2.setType("bar");
			vm.populateTypeChart(vm.statistics.type);
		}


		vm.populateTypeChart = function (object){
			for (var a in object) {
				if (object.hasOwnProperty(a)) {
					vm.chart2.label.push(a)
					vm.typeArray.push(a)
					vm.chart2.data.push(object[a])
				}
			}
		}

		$scope.$watch(()=>vm.type, function(newValue, oldValue){
			if (newValue !== oldValue) {
				switch (newValue) {
					case "Web":
						vm.chart1.setData([1000,50])
						break;
					case "Total":
						vm.chart1.setData([vm.statistics.operational,vm.statistics.notOperational]);
						break;
					default:

				}
			}
		});


		//Default for all charts
		vm.options = {legend: {display: true, position: 'bottom'}};
		// vm.option2 = {config: {scales: {xAxes: [{ticks: {maxRotation: 0 }}]}}};

	};

	statsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataservice']

	angular
	.module('elixibilitasApp')
	.controller("statsController", statsController);



})();
