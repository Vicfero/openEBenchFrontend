/**
@name benchController.js
@description tool page controller
@version 1.0
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';

	/**
	@name benchController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author
	*/
	function benchController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q ,dataservice){

		var vm = this;
        // TODO:
            console.log("estoy aqui");
        // lo que quieras aqui



	};

	benchController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataservice']

	angular
	.module('elixibilitasApp')
.controller("benchController", benchController);



})();
