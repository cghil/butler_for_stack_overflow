'use strict';

angular.module('myAuthApp')
    .controller('SigninCtrl', function($scope, $log, validationService, sessionService, $location) {

        $scope.user = {};

        $scope.$watch('user.email', function(newValue, oldValue) {

            if (!newValue) return;

            $scope.reqs = [];

            if (validationService.isEmailValid(newValue)) {
                $scope.reqs.push('Must be a valid email');
            }

            $scope.showReqs = $scope.reqs.length;
        });

        $scope.submit = function(){
            var http = sessionService.signIn($scope.user);
            http.then(function(response){
                var email = response.data.email,
                    token = response.data.auth_token,
                    id = response.data.id,
                    username = response.data.username,
                    gravatar = response.data.gravatar;
                sessionService.setUser(email, token, id, username, gravatar);
                sessionService.showUserAsLoggedIn();
                $location.path('/users/'+ id);

            }, function(response){
                if (response.status === 500) {
                    $scope.reqs = [];
                    $scope.reqs.push(response.statusText);
                    $scope.showReqs = $scope.reqs.length;
                } else {
                    $scope.reqs = [];
                    
                    var errors = response.data.errors || 'Internal Errors';
                    
                    $scope.reqs.push(errors);
                    $scope.showReqs = $scope.reqs.length;
                }

            });
        };

    });

/**
 * @ngdoc function
 * @name myAuthApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the myAuthApp
 */