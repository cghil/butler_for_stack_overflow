'use strict'

angular.module('myAuthApp')
	.controller('QuestionCtrl', function(questionService, $scope, $log, $routeParams, sessionService){
		
		$scope.userSession = sessionService.isAuthorized;
		
		$scope.showCommentForm = false;
		
		$scope.addCommentForm = function(){
			$scope.showCommentForm = !$scope.showCommentForm;
		};
		
		$scope.$watch(function(){
			return sessionService.isAuthorized
		}, function(){
			$scope.userSession = sessionService.isAuthorized;
			$scope.user = sessionService.currentUser();
		})

		var questionId = $routeParams.id;
		var httpGetQuestion = questionService.getSingleQuestion(questionId);

		$scope.moment = moment;

		httpGetQuestion.then(function(response){
			$scope.question = response.data.question
			$scope.comments = response.data.comments.reverse();
			// debugger
		}, function(){

		});

	});