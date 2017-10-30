//Angular code
(function (){
	'use strict';

	/**
	@name communityController
	@description controls the community-page.html page of the angular app.
	@version 1.0
	@author Victor Fernández Rodríguez
	*/




	function communityController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q , $routeParams, dataservice){

		var vm = this;

		vm.community = {}
		vm.community.name = $routeParams.community;

		vm.data = {}
		vm.datasets = {}
		vm.metrics = {}
		vm.testevents = {}
		vm.tools = {}

		vm.retrieveInfo = function()
		{
			var url = "https://elixir.bsc.es/benchmarking/Community/" + $routeParams.community + ".json"
			dataservice.getData(url).then(function (response){
				// console.log(response);
				vm.community.description = response.data.description;
				if ("Dataset" in response.data)
				{
					vm.retrieveDatasets(response.data.Dataset);
				}
				if ("Metrics" in response.data)
				{
					vm.retrieveMetrics(response.data.Metrics);
				}
				if ("TestEvent" in response.data)
				{
					vm.retrieveTestEvents(response.data.TestEvent);
				}
			});
		}();

		vm.retrieveDatasets = function(datasets)
		{
			datasets.forEach(function(value, index){
				var url = "https://elixir.bsc.es/benchmarking/Dataset/" + value._id + ".json"
				dataservice.getData(url).then(function (response){
					// console.log(response);
					vm.datasets[response.data._id] = response.data;
				});
			})
		};

		vm.retrieveMetrics = function(metrics)
		{
			metrics.forEach(function(value, index){
				var url = "https://elixir.bsc.es/benchmarking/Metrics/" + value._id + ".json"
				dataservice.getData(url).then(function (response){
					// console.log(response);
					vm.metrics[response.data._id] = response.data;
				});
			})
		};

		vm.retrieveTestEvents = function(testevents)
		{
			testevents.forEach(function(value, index){
				var url = "https://elixir.bsc.es/benchmarking/TestEvent/" + value._id + ".json"
				dataservice.getData(url).then(function (response){
					// console.log(response);
					vm.testevents[response.data._id] = response.data;
					vm.retrieveTool(response.data.tool_id);
				});
			})
		};

		vm.retrieveTool = function(tool)
		{
			if (tool in vm.tools) return false;
			// console.log(tool);
			vm.tools[tool] = "NotAvailable"
			var url = "https://elixir.bsc.es/benchmarking/Tool/" + tool + ".json"
			dataservice.getData(url).then(function (response){
				// console.log(response);
				vm.tools[response.data._id] = response.data;
			});
		}

		vm.isObjectEmpty = function(card){
			return Object.keys(card).length === 0;
		}
	};


	communityController.$inject =
	[
		'$scope',
		'$http',
		'$window',
		'$rootScope',
		'$anchorScroll',
		'$location',
		'$q',
		"$routeParams",
		'dataservice'
	]

	// Controller creation inside the module elixibilitasApp
	angular
	.module('elixibilitasApp')
	.controller("communityController", communityController);


})();
