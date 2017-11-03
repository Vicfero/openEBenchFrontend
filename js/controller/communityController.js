//Angular code
(function (){
	'use strict';

	/**
	@name communityController
	@description controls the community-page.html page of the angular app.
	@version 1.0
	@author Victor Fernández Rodríguez
	*/
	function communityController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q , $routeParams, $swipe, dataservice) {

		var self = this;

		// Constructor and initializer
		self.init 								= function() {
			self.community = {}
			self.community.name = $routeParams.community;

			self.data = {}
			self.datasets = {}
			self.metrics = {}
			self.testevents = {}
			self.tools = {}

			self.retrieveInfo();
		}();

		// Main retrieve function
		self.retrieveInfo 				= function() {
			var url = "https://elixir.bsc.es/benchmarking/Community/" + $routeParams.community + ".json"
			dataservice.getData(url).then(function (response){
					self.community.description = response.data.description;
					if ("Dataset" in response.data)
					{
						self.retrieveDatasets(response.data.Dataset);
					}
					if ("Metrics" in response.data)
					{
						self.retrieveMetrics(response.data.Metrics);
					}
					if ("TestEvent" in response.data)
					{
						self.retrieveTestEvents(response.data.TestEvent);
					}
			});
		};

		// Secondary retrieve functions
		self.retrieveDatasets 		= function(datasets) {
			datasets.forEach( function(value, index){
				var url = "https://elixir.bsc.es/benchmarking/Dataset/" + value._id + ".json"
				dataservice.getData(url).then(function (response){
					self.datasets[response.data._id] = response.data;
				});
			})
		};

		self.retrieveDataset 			= function(dataset_id) {
			if (dataset_id in self.datasets) return false;
			self.datasets[dataset_id] = "NotAvailable"
			var url = "https://elixir.bsc.es/benchmarking/Dataset/" + dataset_id + ".json"
			dataservice.getData(url).then(function (response){
				self.datasets[response.data._id] = response.data;
			});
		}

		self.retrieveMetrics 			= function(metrics) {
			metrics.forEach(function(value, index){
				var url = "https://elixir.bsc.es/benchmarking/Metrics/" + value._id + ".json"
				dataservice.getData(url).then(function (response){
					self.metrics[response.data._id] = response.data;
				});
			})
		};

		self.retrieveMetric 			= function(metric_id) {
			if (metric_id in self.metrics) return false;
			self.metrics[metric_id] = "NotAvailable"
			var url = "https://elixir.bsc.es/benchmarking/Metrics/" + metric_id + ".json"
			dataservice.getData(url).then(function (response){
				self.metrics[response.data._id] = response.data;
			});
		}

		self.retrieveTestEvents 	= function(testevents) {
			testevents.forEach(function(value, index){
				var url = "https://elixir.bsc.es/benchmarking/TestEvent/" + value._id + ".json"
				dataservice.getData(url).then(function (response){
					self.testevents[response.data._id] = response.data;
					self.retrieveTool(response.data.tool_id);
				});
			})
		};

		self.retrieveTestEvent 		= function(testevent_id) {
			if (testevent_id in self.testevents) return false;
			self.testevents[testevent_id] = "NotAvailable"
			var url = "https://elixir.bsc.es/benchmarking/TestEvent/" + metric_id + ".json"
			dataservice.getData(url).then(function (response){
				self.testevents[response.data._id] = response.data;
				self.retrieveTool(response.data.tool_id);
			});
		}

		self.retrieveTool 				= function(tool) {
			if (tool in self.tools) return false;
			self.tools[tool] = "NotAvailable"
			var url = "https://elixir.bsc.es/benchmarking/Tool/" + tool + ".json"
			dataservice.getData(url).then(function (response){
				self.tools[response.data._id] = response.data;
			});
		}

		// Auxiliary functions
		self.isObjectEmpty 				= function(card) {
			return Object.keys(card).length === 0;
		}

		self.getSizeOf 						= function(object) {
			return Object.keys(object).length;
		}

		self.getArrayFromNumber 	= function(number) {
			console.log(number);
			return new Array(number);
		}

		self.getKeys 							= function(object) {
			return Object.keys(object)
		}

		self.getIndex 						= function(index, max) {
			if ((index) >= max){
			// console.log(index, max - index);
				return index - max;
			}
			else {
				// console.log(index, index);
				return index;
			}
		}

		self.isMobile 						= function() {
			return $window.innerWidth < 700;
		}
	};

	// Dependecy injection
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
		"$swipe",
		'dataservice'
	]

	// Controller creation inside the module elixibilitasApp
	angular
	.module('elixibilitasApp')
	.controller("communityController", communityController)


	// Directives
	.directive('datasetDirective', function() {
	  return {
			scope: {
			      element: '=',
						index: '=',
						length: '='
			    },
	    templateUrl: 'view/template/dataset-template.html'
	  };
	})







;

})();
