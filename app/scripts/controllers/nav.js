'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
    .controller('NavCtrl', function($scope, $location) {

        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path()
        };

    });