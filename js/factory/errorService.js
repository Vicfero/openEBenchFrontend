(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .service('errorService', errorService);

    errorService.$inject = [];


        function errorService() {

            var service = {
                error: error
            }

            return service;

            function error(code) {
                return "<div class='alert alert-danger text-center' role='alert'> Error with code : "+code+"</div>";
            };
        }



})();
