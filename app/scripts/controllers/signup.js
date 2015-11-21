'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('SignupCtrl', function ($scope, validationService, sessionService, $location) {
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

    $scope.$watch('user.username', function(newValue, oldValue){
        if (!newValue) return;
        $scope.reqs = [];

        if (!validationService.isGreaterThanFourCharacters(newValue)){
            $scope.reqs.push('Username needs to be > 4 characters');
        };

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

    $scope.submit = function(){
    	if ($scope.user.password !== $scope.user.password_confirmation){
    		$scope.reqs = [];
    		$scope.reqs.push('Passwords must match');
    		$scope.showReqs = $scope.reqs.length;
    	} else {
	    	var user = {user: $scope.user};
	    	var http = sessionService.signUp(user);
	    	http.then(function(response){
	    		var email = response.data.email,
	    			token = response.data.auth_token,
	    			id = response.data.id,
                    username = response.data.username,
                    gravatar = response.data.gravatar;

	    		sessionService.setUser(email, token, id, username, gravatar);
	    		sessionService.showUserAsLoggedIn();
	    		$location.path('#/');
	    	}, function(response){
	    		$scope.reqs = [];
	    		if (response.status === 500) {
	    			$scope.reqs.push(response.statusText);
	    			$scope.showReqs = $scope.reqs.length;
	    		} else {
	    			var errors = response.data.errors || 'Internal Errors';
	    			$scope.reqs.push(errors);
	    			$scope.showReqs = $scope.reqs.length;
	    		}

	    	});
    	}
    };
    
  });
