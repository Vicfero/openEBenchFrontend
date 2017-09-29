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


	toolController.$inject = ['$scope','$http', '$window','$rootScope']
	/**
	@name controller
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http, $window, $rootScope){

		var vm = this;
		vm.loadInitData = function() {
			vm.currentPage = 1;
			vm.pageSize = 10;
			vm.toolsArray = [];
			if(!$rootScope.array){
				// vm.toolsArray = $window.sessionStorage.getItem("toolList");
				vm.getData();
			} else {
				vm.toolsArray = $rootScope.array;
			}

		};

		vm.getData = function (){
			$http({
				method: 'GET',
				url: 'https://elixir.bsc.es/tool'
				// http://localhost/~vsundesh/openEBenchFrontend/json/tool.json
			}).then(function successCallback(response){
					vm.toolsArray =  response.data;
					$rootScope.array = vm.toolsArray;
					console.log(response.data);
					// $window.sessionStorage.setItem("toolList",JSON.stringify(response.data));
			}, function errorCallback(response){
					console.log(response);
			});
		}

		vm.showDetails = function (tool){
			console.log(tool);
			console.log("details",tool.semantics);
			var object = tool.semantics;

			var objectKeys = Object.keys(object);
			for (var i = 0; i < objectKeys.length; i++) {
				switch (objectKeys[i]) {
					case "input" :
						var arrayOfObjects = object[objectKeys[i]]
						vm.iterateArrayOfObjects(arrayOfObjects);
						break;
					case "operation" :
						var array = object[objectKeys[i]];
						vm.iterateArray(array);
						break;
					case "output" :
						var arrayOfObjects = object[objectKeys[i]]
						vm.iterateArrayOfObjects(arrayOfObjects);
						break;
					case "topic" :
						var array = object[objectKeys[i]];
						vm.iterateArray(array);
						break;
					default:

				};
			};
		};
		//
		vm.iterateArrayOfObjects = function (arrayOfObjects){
			// console.log(arrayOfObjects);
			for (var k in arrayOfObjects) {
				var x = Object.values(arrayOfObjects[k]);
				if(Array.isArray(x)){
					vm.iterateArray(x);
				}
			}
		};

		vm.iterateArray = function (array){
				for (var i = 0; i < array.length; i++) {
					if(Array.isArray(array[i])){
						vm.iterateArray(array[i]);
					} else {
						console.log(array[i]);
					}
				}
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
