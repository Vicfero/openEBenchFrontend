//Angular code
(function (){
	'use strict';

	/**
	@name benchController
	@description controls the bench-page.html page of the angular app.
	@version 1.0
	@author Victor Fernández Rodríguez
	*/




	function benchController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q ,dataservice){

		var vm = this;
		vm.typeArray = ["Total"];
		vm.type=vm.typeArray[0];

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

		vm.extendCommunity = function(community_index)
		{
			if (vm.communities[community_index]._extended == false)
			{
				var url = vm.apiurl + "/Community/" + vm.communities[community_index]._id + ".json"

				dataservice.getData(url).then(function (response){
					vm.communities[community_index]._extended =
					{
						"datasets":response.data.Dataset,
						"metrics":response.data.Metrics,
						"events":response.data.TestEvent
					}
					vm.getDatasetsForCommunity(community_index)
					console.log(vm.communities[community_index])
				})
			}
		}

		vm.getDatasetsForCommunity = function(community_index)
		{
			console.log("Getting info for community " + vm.communities[community_index]._id)
			vm.communities[community_index]._extended["datasets"]
			.forEach(function(dataset)
			{
				var url = vm.apiurl + "/Dataset/" + dataset._id + ".json"
				dataservice.getData(url).then(function(response)
				{
					console.log(response.data)
				})
			})
		}



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
		'dataservice'
	]

	// Controller creation inside the module elixibilitasApp
	angular
	.module('elixibilitasApp')
	.controller("benchController", benchController);


})();
