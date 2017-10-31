/**
@name homeController.js
@description home page controller
@version 1.0
@date 09/06/2017
@author Vicky Madan Sundesha
*/

//Angular code
(function() {
    'use strict';



		/**
		@name controller function
		@description controls the home-page.html page of the angular app.
		@version 1.0
		@author Vicky Sundesha
		*/
		function homeController ($scope){
            $('input').hover(elevated);
            $('.elevate').hover(elevated);


            function elevated(){
                $(this).toggleClass("elevated");
            }
		 }

        angular.module('elixibilitasApp')
        .controller("homeController",homeController)
})();
