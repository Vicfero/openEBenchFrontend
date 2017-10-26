(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http','$q'];


        function dataservice($http,$q) {

            var service = {
                getData: getData
            }

            return service;
            
            function getData(url) {
                var def = $q.defer();
                $http({
                    method: 'GET',
                    url: url,
                }).then(function successCallback(response){
                         def.resolve(response);
                }, function errorCallback(response){
                        def.reject(response);
                });
                return def.promise;
            };
        }



})();
