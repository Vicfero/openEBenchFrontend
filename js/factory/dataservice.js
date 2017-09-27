(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];


    function dataservice($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {
            return $http({
                method: 'GET',
                url: 'https://elixir.bsc.es/tool'
                })
                .then(successCallback)
                .catch(errorCallback);


            function errorCallback(response){
                console.log(response);
                console.log('XHR Failed for getAvengers.' + response.data);
                return response.data;
            };

            function successCallback(response){
                    console.log(response.data);
                    // $scope.toolsArray=response.data;
                    return response.data;
            }
        }

    }
    

})();
