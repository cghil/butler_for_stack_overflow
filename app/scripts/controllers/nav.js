'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
    .controller('NavCtrl', function($scope, $location, sessionService) {

        $scope.userPageSessionId = function(){
            return "/users/" + sessionStorage.id;
        };

        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path()
        };

        $scope.userSession = sessionService.isAuthorized;

        $scope.$watch(function() {
            return sessionService.isAuthorized
        }, function() {
            $scope.userSession = sessionService.isAuthorized;
            $scope.user = sessionService.currentUser();
        });

        $scope.signOutUser = function(){
            sessionService.showUserAsLoggedOut();
        };

    });