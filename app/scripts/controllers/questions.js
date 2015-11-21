'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('QuestionsCtrl', function (questionService, $http, $scope, $log) {
    var httpQuestions = questionService.getQuestions();

    httpQuestions.then(function(response){
    	$scope.questions = response.data.questions;
    }, function(response){
    	$log.log('An error occurred; could not reach resource');
    })
  });
