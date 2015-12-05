'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('UsersCtrl', function($scope, sessionService, $location, userService, $routeParams) {
   	
    $scope.moment = moment;

    if ($routeParams.id == sessionStorage.id){
      $scope.yourpage = true;
    } else {
      $scope.yourpage = false;
    };

    sessionService.redirectNotAuthenticated();
    
    var enlargeGravatar = function(url){
      var url = url;
      var lastIndex = url.indexOf('.png');
      var gravatar = url.substring(0, lastIndex);
      return gravatar+'?s=200';
    };

    $scope.paramId = $routeParams.id;
    var token = sessionStorage.token;
    var httpUser = userService.showUser(token, $routeParams.id);
    
    httpUser.then(function(response){
      $scope.user = response.data.user;
      $scope.questions = response.data.questions.reverse();
      debugger
      $scope.comments = response.data.comments.reverse();
      $scope.user.gravatar = enlargeGravatar(response.data.user.gravatar);
    }, function(response){
      console.log('Error!');
    });

    $scope.showComments = false;
    $scope.showQuestions = true;

    $scope.switchShowValuesForCommentsAndQuestions = function(value){
      
      if(value === "comment") {
        $scope.showComments = true;
        $scope.showQuestions = false;
      }

      if(value === "question") {
        $scope.showComments = false;
        $scope.showQuestions = true;
      }

    };

    $scope.bioForm = false;
    
    $scope.showBioForm = function(){
      $scope.bioForm = !$scope.bioForm;
    };

    $scope.submitBio = function(){
      var bio = $scope.user.bio;
      var user = {user: {bio: bio}}
      userService.updateUser(token, $routeParams.id, user);
      $scope.showBioForm();
    };

  });