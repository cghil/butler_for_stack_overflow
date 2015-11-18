'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
    .controller('MainCtrl', function($scope, sessionService) {

        $scope.userSession = sessionService.isAuthorized;

        $scope.$watch(function() {
            return sessionService.isAuthorized
        }, function() {
            $scope.userSession = sessionService.isAuthorized;
            $scope.user = sessionService.currentUser();
        });

    });