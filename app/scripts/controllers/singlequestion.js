'use strict'

angular.module('myAuthApp')
	.controller('QuestionCtrl', function(questionService, $scope, $log, $routeParams){
		var questionId = $routeParams.id;
		var httpGetQuestion = questionService.getSingleQuestion(questionId);

		httpGetQuestion.then(function(response){
			$scope.question = response.data.question
			$scope.comments = response.data.comments
			debugger
		}, function(){

		})
	});