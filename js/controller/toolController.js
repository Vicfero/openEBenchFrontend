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


	toolController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q']
	/**
	@name toolController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q){

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

			//if $rootScope.array is empty
			if(!$rootScope.array){
				// var url = 'http://bsclife010.int.bsc.es/~vsundesh/openEBenchFrontend/json/tool.json'
				var url = 'https://elixir.bsc.es/tool'

				vm.loadingDisplay = 0;
				vm.getChunks();
				// vm.getData(url).then(function(response){
				// 	vm.loadData(response)
				// }, function(error){
				// 	vm.createMsg();
				// });

			} else {
				//if $rootScope.array is full
				vm.toolsArray = $rootScope.array;
				vm.loadingDisplay = 1;
			}

		};

		vm.getChunks = function (){
			var skip = 0;
			var limit = 100;
			var size = 8000;
			while(skip<size){
				vm.loopChunks(skip,limit);
				skip = skip + limit;
			}
		}

		vm.loopChunks = function(skip,limit){
			var url = 'https://elixir.bsc.es/tool?skip='+skip+'&limit='+limit
			vm.getData(url).then(function(response){
				vm.pushData(response);
				if(response.data.length==0){
					return;
				}
				console.log(response.data.length);
			}, function(error){
				vm.createMsg();
			});
		}

		vm.pushData = function (tool){
			vm.chunks.push(vm.allData(tool.data))
			vm.toolsArray = [].concat.apply([], vm.chunks);
			$rootScope.array = [].concat.apply([], vm.chunks);
			vm.loadingDisplay = 1
		}

		vm.sort = function (keyName){
			vm.sortKey = keyName;
			vm.reverse = !vm.reverse;
		}

		vm.loadData = function(response){
			$rootScope.array = vm.allData(response.data);
			vm.toolsArray = vm.allData(response.data);
			vm.loadingDisplay = 1;
		}


		vm.loadingGif = function(){

		}

		/**
		@name getData
		@description getData fetches all tools in json format from the api
		@param url to get
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.getData = function (url){
			var def = $q.defer();
			$http({
				method: 'GET',
				url: url,
				// timeout: 3000,
			}).then(function successCallback(response){
					 def.resolve(response);
			}, function errorCallback(response){
					def.reject(response);
			});
			return def.promise;
		}

		/**
		@name createMsg
		@description creates div with error message
		@version 1.0
		@author Vicky Sundesha
		@return messageToDisplay this is the the code that is displayed when there is an error
		*/
		vm.createMsg = function (){
			vm.loadingDisplay = 2;
			var msg = "Sorry our services are not available at this moment. Please try later";
			var messageToDisplay = "<div class='alert alert-danger text-center' role='alert'>"+msg+"</div>";
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
			vm.displayDetailsView = 1;
			var url = tool._id.replace(/\/tool\//g,"/metrics/").replace("http","https");
			console.log(url);
			console.log(tool);
			vm.getData(url).then(function (response){
				console.log(url);
				vm.metrics = response.data;
			})
		};

		vm.allData= function (tool){
			var array = []
			for (var i = 0; i < tool.length; i++) {
				array.push(vm.initTool(tool[i],vm.initInstance(tool[i])));
			}
			return array
		}

		// vm.removeDuplicates = function (tool){
		// 	var noDuplicatesArray = [];
		// 	for (var i = 0; i < tool.length; i++) {
		// 		if(i>0){
		// 			if(vm.checkName(i,tool)){
		// 				for (var j = 0; j < tool[i].getInstance().length; j++) {
		// 					noDuplicatesArray[noDuplicatesArray.length-1].setInstance(tool[i].type : tool[i].instance);
		// 				}
		// 			} else {
		// 				noDuplicatesArray.push(tool[i]);
		// 			}
		// 		} else {
		// 			noDuplicatesArray.push(tool[i]);
		// 		}
		// 	}
		// 	return noDuplicatesArray
		// }


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
				vm.getData(url).then(function (response){
					vm.searchByEdam(response.data);
				},function(error){
					vm.createMsg();
				});
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


})();
