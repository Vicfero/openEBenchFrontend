//Angular code
(function (){
	'use strict';

	/**
	@name benchController
	@description controls the bench-page.html page of the angular app.
	@version 1.0
	@author Victor Fernández Rodríguez
	*/




	function benchController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q , $routeParams, dataservice){

		var vm = this;

		vm.apiurl = "https://elixir.bsc.es/benchmarking"

		vm.makeChart = function()
		{
			vm.chart = new Chart();
			vm.chart.setType("line");
			vm.chart.setLabel(vm.mockJSON[0].Xval);
			vm.chart.setData([vm.mockJSON[0].Yval]);
		}

		// this.makeChart();

		vm.retrieveCommunities = function()
		{
			var url = "https://elixir.bsc.es/benchmarking/Community.json"
			vm.communities = [];
			dataservice.getData(url).then(function (response){

				response.data.Commmunity.forEach(function(element)
				{
					vm.communities.push(element);
					element.show = false;
					element._extended = false;

					element.links.forEach(function(link)
					{
						if (link.label == "MainSite")
						{
							element["MainSite"] = link["uri"];
						}
					})
				})
			});
		}();
	};

	benchController.$inject =
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
	.controller("benchController", benchController);


})();
