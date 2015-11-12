'use strict';

angular.module('myAuthApp')
    .controller('SigninCtrl', function($scope, $log, validationService) {

        $scope.user = {};


        $scope.$watch('user.password', function(newValue, oldValue) {

            if (!newValue) return;

            $scope.reqs = [];

            if (!validationService.isLongEnough(newValue)) {
                $scope.reqs.push('Password must be >= 8 characters');
            }

            if (!validationService.hasANumber(newValue)) {
                $scope.reqs.push('Password must have one number');
            }

            $scope.showReqs = $scope.reqs.length;
        });

        $scope.$watch('user.email', function(newValue, oldValue) {

            if (!newValue) return;

            $scope.reqs = [];

            if (validationService.isEmailValid(newValue)) {
                $scope.reqs.push('Must be a valid email');
            }

            $scope.showReqs = $scope.reqs.length;
        });

        $scope.$watch('user.password_confirmation', function(newValue, oldValue) {

            if (!newValue) return;

            $scope.reqs = [];

            if (validationService.arePasswordMatching(newValue, $scope.user.password)) {
                $scope.reqs.push('Passwords need to match');
            };

            $scope.showReqs = $scope.reqs.length;

        });

    });

/**
 * @ngdoc function
 * @name myAuthApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the myAuthApp
 */