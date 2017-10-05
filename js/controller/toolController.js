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
		.controller("toolController", toolController);


	toolController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location']
	/**
	@name toolController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http, $window, $rootScope, $anchorScroll, $location){

		var vm = this;


		/**
		@name loadInitData
		@description loadInitData starts the app variables with default values this is also where the the $rootScope.array is loaded
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.loadInitData = function() {
			vm.currentPage = 1;
			vm.pageSize = 10;
			vm.toolsArray = [];
			vm.displayDetailsView = 0;
			vm.basicDetails;
			vm.message = "";
			//if $rootScope.array is empty
			if(!$rootScope.array){
				vm.loadingDisplay = 0;
				vm.getData();
			} else {
				//if $rootScope.array is full
				vm.toolsArray = $rootScope.array;
				vm.loadingDisplay = 1;
			}

		};

		/**
		@name getData
		@description getData fetches all tools in json format from the api and saves it to the $rootScope.array
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.getData = function (){
			// var url = 'http://bsclife010.int.bsc.es/~vsundesh/openEBenchFrontend/json/tool.json'
			var url = 'https://elixir.bsc.es/tool'
			$http({
				method: 'GET',
				url: url,
				timeout: 3000,
			}).then(function successCallback(response){
					vm.populateToolDetails(response.data);
			}, function errorCallback(response){
					var msg = "Sorry our services are not available at this moment. Please try later"
					vm.createMsg(response,msg);
			});
		}


		vm.createMsg = function (response,msg){
			var messageToDisplay = "<div class='alert alert-danger text-center' role='alert'>"+msg+"</div>";
            vm.message = messageToDisplay;
		}



		/**
		@name showDetails
		@description showDetails is called when details button is clicked for everytool this iterates the semantics and send each semantic to this corisponding function.
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.showDetails = function (tool){
			vm.basicDetails=tool;
			vm.displayDetailsView = 1;
		};





		vm.populateToolDetails=function(tool){
			for (var i = 0 ; i<tool.length; i++){
				var urlToBioTools = "";
				var urlToBioTools = "https://bio.tools/"+tool[i].name.replace(/[\s]/g,"_");
				var toolBasicDetails = new Detail();
				toolBasicDetails.setLinkToBioTool(urlToBioTools);
				toolBasicDetails.setName(tool[i].name);
				toolBasicDetails.setLink(tool[i].homepage)
				toolBasicDetails.setType(tool[i]['@type'])
				toolBasicDetails.setDesc(tool[i].description)
				if(tool[i].version){
					toolBasicDetails.setVersion(tool[i].version)
				}
				if(tool[i].publications){
					toolBasicDetails.setPublication(tool[i].publications)
				}
				if(tool[i].contacts){
					toolBasicDetails.setContact(tool[i].contacts)
				}
				if(tool[i].repositories){
					toolBasicDetails.setRepo(tool[i].repositories)
				}
				if(tool[i].documentation){
					toolBasicDetails.setDocs(tool[i].documentation)
				}
				vm.toolsArray.push(toolBasicDetails);
			}
			$rootScope.array = vm.toolsArray;
			vm.loadingDisplay = 1;

		}


	}


})();
