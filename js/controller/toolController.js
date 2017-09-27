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


	toolController.$inject = ['$scope','$http', 'dataservice']
	/**
	@name controller
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http){
		var vm = this;
		vm.loadInitData = function() {
			vm.currentPage = 1;
			vm.pageSize = 10;
			vm.toolsArray = [];
			vm.getData();

		};

		vm.getData = function (){
			$http({
				method: 'GET',
				url: 'http://localhost/~vsundesh/openEBenchFrontend/json/tool.json'
				// http://localhost/~vsundesh/openEBenchFrontend/json/tool.json
			}).then(function successCallback(response){
					vm.toolsArray =  response.data;
			}, function errorCallback(response){
					console.log(response);
			});
		}

		vm.showDetails = function (tool){
			console.log("details",tool.semantics);
			// for (var a in tool) {
			//
			// }
			Object.keys(tool).forEach(function(key,index) {
				console.log(key);
			    // key: the name of the object key
			    // index: the ordinal position of the key within the object
			});
		};
	}



	// function loadData(){
	// 	return getTools().then(function (){
	// 		console.log('loaded');
	// 	})
	// }
	//
	// function getTools(){
	// 	// console.log();
	// 	return dataservice.getData()
	// 	.then(function (data){
	// 		$scope.toolsArray=data;
	// 		console.log(data,"hola");
	// 		return $scope.toolsArray;
	// 	});
	// }


})();
