/**
@name toolController.js
@description tool page controller
@version 1.0
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';


	/**
	@name toolController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q, dataservice, errorService){

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
			vm.edamTerm = "";
			vm.sortKey;
			vm.reverse;
			vm.chunks=[];
			vm.typeArray = [];
			$scope.type = vm.typeArray[0];

			//if $rootScope.array is empty
			if(!$rootScope.array){
				var url = 'https://elixir.bsc.es/tools/statistics/';
				dataservice.getData(url)
					.then(function (response){
						vm.statsData = response.data;
						vm.getChunks(response.data.all.total);
						vm.typeArray = Object.keys(response.data);
						vm.loadingDisplay = 0;
					}).catch(function(error){
						vm.createMsg(error.status);
					})
					// .catch(console.log(error));

			} else {
				//if $rootScope.array is full
				vm.toolsArray = $rootScope.array;
				vm.loadingDisplay = 1;
			}

		};


		$('input').hover(elevated);
		// $('.elevate').hover(elevated);


		function elevated(){
			$(this).toggleClass("elevated");
		}

		// get api in chunks
		vm.getChunks = function (size){
			console.log(size);
			var skip = 0;
			var limit = 100;
			var size = size;
			while(skip<size){
				vm.loopChunks(skip,limit);
				skip = skip + limit;

			}
		}

		//loop chunks
		vm.loopChunks = function(skip,limit){
			var url = 'https://elixir.bsc.es/tool?skip='+skip+'&limit='+limit
			dataservice.getData(url)
				.then(function (response){
					vm.pushData(response);
				}).catch(function(error){
					vm.createMsg(error.status);
				})
		}


		//the data recived from api in places
		vm.pushData = function (tool){
			vm.chunks.push(vm.allData(tool.data))
			vm.toolsArray = [].concat.apply([], vm.chunks);
			$rootScope.array = [].concat.apply([], vm.chunks);

			vm.loadingDisplay = 1
		}

		//Sort name
		vm.sort = function (keyName){
			vm.sortKey = keyName;
			vm.reverse = !vm.reverse;
		}


		/**
		@name createMsg
		@description creates div with error message
		@version 1.0
		@author Vicky Sundesha
		@return messageToDisplay this is the the code that is displayed when there is an error
		*/
		vm.createMsg = function (code){
			vm.loadingDisplay = 2;
			var messageToDisplay = errorService.error(code)
            vm.message = messageToDisplay;
		}



		/**
		@name showDetails
		@description showDetails is called when details button is clicked for everytool this iterates the semantics and send each semantic to this corisponding function.
		@param tool for details.
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.showDetails = function (tool){
			vm.basicDetails=tool;
			var url = tool._id.replace(/\/tool\//g,"/metrics/").replace("http","https");
			vm.displayDetailsView = 1;
			// vm.metrics = "<opeb data-widgetService="+url+"></opeb>";
			vm.metrics = url;
			// dataservice.getData(url)
			// 	.then(function (response){
			// 		vm.metrics = response.data;
			// });
		};

		vm.allData= function (tool){
			var array = []
			for (var i = 0; i < tool.length; i++) {
				array.push(vm.initTool(tool[i],vm.initInstance(tool[i])));
			}
			return array
		}


		/**
		@name initInstance
		@description Creats new instances of a tool and returns the instance
		@param tool is the response data from the Api
		@param i is the posistion
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.initInstance = function (tool){
			var instance = new Instance();
			// if(tool['@type']){
			// 	instance.setType(tool['@type'])
			// }
			if(tool.version){
				instance.setVersion(tool.version)
			}
			if(tool.publications){
				instance.setPublication(tool.publications)
			}
			if(tool.repositories){
				instance.setRepo(tool.repositories)
			}
			if(tool.documentation){
				instance.setDocs(tool.documentation)
			}
			return instance;
		}


		/**
		@name checkName
		@description checks if the tool name exists
		@param tool is the response data from the Api
		@param i is the posistion
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.checkName = function (i,tool){
			return tool[i].name != tool[i-1].name ? false : true;
		}


		/**
		@name initTool
		@description Creats new tool and returns the tool
		@param tool is the response data from the Api
		@param i is the posistion
		@param instance is are the diffrent instances of the tool web,cmd,app etc..
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.initTool = function (tool,instance){
			var toolBasicDetails = new Tool();
			toolBasicDetails.setId(tool['@id']);
			toolBasicDetails.setType(tool['@type']);
			toolBasicDetails.setName(tool.name);
			toolBasicDetails.setDesc(tool.description);
			toolBasicDetails.setLink(tool.homepage);
			toolBasicDetails.setContact(tool.contacts);
			toolBasicDetails.setCredits(tool.credits);
			var urlToBioTools = "";
			var urlToBioTools = "https://bio.tools/"+tool.name.replace(/[\s]/g,"_");
			toolBasicDetails.setLinkToBioTool(urlToBioTools);
			toolBasicDetails.setInstance(instance);
			return toolBasicDetails;
		}

		vm.removeFilter = function () {
			vm.edamTerm = "";
			vm.toolsArray = $rootScope.array;
			// vm.loadingDisplay = 1;

		}

		vm.advancedSearch = function (){
			if(vm.edamTerm){
				var url = "https://elixir.bsc.es/edam/tool/search?text="+vm.edamTerm;
				dataservice.getData(url)
					.then(function (response){
						vm.searchByEdam(response.data);
					}).catch(function(error){
						vm.createMsg(error.status);
					})
			} else {
				vm.toolsArray = $rootScope.array;
			}


		}

		vm.searchByEdam = function (data){
			var toolArray = [];
			for (var i = 0; i < data.length; i++) {
				var tool;
				if($rootScope.array.find(tool => tool['_id'] === data[i]['@id'])){
					toolArray.push($rootScope.array[i]);
				}
			}
			if(i == data.length){
				vm.toolsArray = toolArray;
			}

		}

	}


	toolController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q', 'dataservice', 'errorService']

	angular
	.module('elixibilitasApp')
	.controller("toolController", toolController);

})();
