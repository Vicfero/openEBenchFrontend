(function (){
    'use strict';
    angular
        .module('elixibilitasApp')
        .config(router);

    function router($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "view/template/home-page.html"
            })
            .when("/tools", {
                templateUrl : "view/template/tool-page.html"
            })
    }
})();
