'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('UsersCtrl', function ($scope, sessionService, $location) {
   	
    sessionService.redirectNotAuthenticated();
    
    var enlargeGravatar = function(){
      var url = sessionStorage.gravatar;
      var lastIndex = url.indexOf('.png');
      var gravatar = url.substring(0, lastIndex);
      return gravatar+'?s=200';
    };

    $scope.gravatar = enlargeGravatar();

    $scope.user = {email: sessionStorage.email, username: sessionStorage.username, id: sessionStorage.id, gravatar: 'hello'}

  });
