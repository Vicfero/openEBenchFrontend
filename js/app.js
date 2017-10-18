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
            'ngSanitize',
            'ui.bootstrap',
            'ngRoute',
            'gridshore.c3js.chart'
            //'graphApp.services',
            // 'ngMaterial',
            // 'ui.router',
            // 'gridshore.c3js.dashboard',
            // 'gridshore.c3js.bar',
            // 'gridshore.c3js.line',
            // 'gridshore.c3js.pie',
            // 'gridshore.c3js.callback',
            // 'gridshore.c3js.donut',
            // 'gridshore.c3js.config',
            // 'gridshore.c3js.gauge',
            // 'gridshore.c3js.dynamic'
        ]);
})();
