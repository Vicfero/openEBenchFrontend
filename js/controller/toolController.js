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


		toolController.$inject = ['dataservice']
	/**
	@name controller
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http){
		$scope.loadInitData = function () {
			  $scope.currentPage = 1;
			  $scope.pageSize = 10;
			  $scope.toolsArray = [];
			  loadData();
		};

		function loadData(){
			return getTools().then(function (){
				console.log('loaded');
			})
		}

		function getTools(){
			return dataservice.getData()
			.then(function (data){
				$scope.toolsArray=data;
				console.log(data,"hola");
				return $scope.toolsArray;
			});
		}
		// $scope.getData = function (){
		// 	$http({
		// 		method: 'GET',
		// 		url: 'https://elixir.bsc.es/tool'
		// 	}).then(function successCallback(response){
		// 			console.log(response);
		// 			$scope.toolsArray=response.data;
		// 	}, function errorCallback(response){
		// 		console.log(response);
		// 	});
		// }
	}


})();
