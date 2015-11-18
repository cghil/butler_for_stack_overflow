'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('SignupCtrl', function ($scope, validationService) {
    $scope.user = {};

    $scope.$watch('user.password', function(newValue, oldValue){
    	if (!newValue) return;
    	$scope.reqs = [];

    	if (!validationService.isLongEnough(newValue)){
    		$scope.reqs.push('Password must be >= 8 characters');
    	}

    	if (!validationService.hasANumber(newValue)){
    		$scope.reqs.push('Password must have >= one number')
    	}

    	$scope.showReqs = $scope.reqs.length;
    });

    $scope.$watch('user.email', function(newValue, oldValue){
    	if (!newValue) return;

    	$scope.reqs = [];

    	if(validationService.isEmailValid(newValue)){
    		$scope.reqs.push('Must be a valid email');
    	}

    	$scope.showReqs = $scope.reqs.length;
    });

    $scope.$watch('user.password_confirmation', function(newValue, oldValue){
    	if (!newValue) return;

    	$scope.reqs = [];

    	if(validationService.arePasswordsMatching(newValue, $scope.user.password)) {
    		$scope.reqs.push('Passwords must match');
    	}

    	$scope.showReqs = $scope.reqs.length;
    });
  });
