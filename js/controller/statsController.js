/**
@name toolController.js
@description tool page controller
@version 1.0
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';

	angular
		.module('elixibilitasApp')
		.controller("statsController", statsController);


	statsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q']
	/**
	@name toolController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function statsController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q){

		var vm = this;

	// 	vm.datapoints = [
	//         {"x": "one", "top-1": 10, "top-2": 12},
	//         {"x": "two", "top-1": 11, "top-2": 13},
	//         {"x": "three", "top-1": 12, "top-2": 14},
	//         {"x": "four", "top-1": 13, "top-2": 15},
	//         {"x": "five", "top-1": 14, "top-2": 16}
	//     ];
	//     vm.datacolumns = [{"id": "top-1", "type": "bar", "name": "Top one"},
	//         {"id": "top-2", "type": "bar", "name": "Top two"}];
	//     vm.datax = {"id": "x"};
	//
	//
	}


})();
