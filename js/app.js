/**
    @name app.js
    @description app.js this is where you create the directives and add the modules for the angular js app !
    @version 1.0
    @author Vicky Sundesha
*/

(function() {
    'use strict';

    angular
        .module('elixibilitasApp', [
            'angularUtils.directives.dirPagination',
            'ngAnimate',
            'ngSanitize',
            'ui.bootstrap',
            'ngRoute'
        ]);
})();
