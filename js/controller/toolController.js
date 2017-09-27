/**
@name toolController.js
@description home page controller
@version 1.0
@date 09/06/2017
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';

	angular
		.module('elixibilitasApp')
		.controller("toolController", toolController);


	toolController.$inject = ['dataservice','$http']
	/**
	@name controller
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http){
		var vm = this;

		vm.loadInitData = function() {
			console.log("hola");
			vm.currentPage = 1;
			vm.pageSize = 10;
			vm.toolsArray = [];
			// loadData();
			vm.getData();
		};
		//
		// function loadData(){
		// 	return getTools().then(function (){
		// 		console.log('loaded');
		// 	})
		// }
		//
		// function getTools(){
		// 	return dataservice.service()
		// 	.then(function (data){
		// 		$scope.toolsArray=data;
		// 		console.log(data,"hola");
		// 		return $scope.toolsArray;
		// 	});
		// }
		vm.getData = function (){
			$http({
				method: 'GET',
				url: 'https://elixir.bsc.es/tool'
			}).then(function successCallback(response){
					console.log(response);
					vm.toolsArray=response.data;
			}, function errorCallback(response){
				console.log(response);
			});
		}
	}


})();
