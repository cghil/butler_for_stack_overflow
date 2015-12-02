'use strict'

angular.module('myAuthApp')
	.controller('QuestionCtrl', function(questionService, $scope, $log, $routeParams, sessionService, commentService){
		
		$scope.userSession = sessionService.isAuthorized;
		$scope.showCommentForm = false;
		$scope.newComment = {};


		$scope.addCommentForm = function(){
			$scope.showCommentForm = !$scope.showCommentForm;
		};

		$scope.submitComment = function(){
			var body = $scope.newComment.body,
				question_id = $scope.question.id,
				user_id = sessionStorage.id;
			var comment = {body: body, question_id: question_id, user_id: user_id};
			var httpPostCommentReq = commentService.createComment(sessionStorage.token, comment);

			httpPostCommentReq.then(function(response){
				var newComment = response.data;
				$scope.comments.unshift(newComment);
			}, function(response){
				$log.log('An Error Occurred');
			});
		};
		
		$scope.showDelete = function(comment){
			if (comment.user_id == sessionStorage.id) {
				return true
			} else {
				return false
			}
		};

		$scope.deleteComment = function(comment){
			var token = sessionStorage.token,
				commentId = comment.id;
			var httpDeleteCommentReq = commentService.deleteComment(token, commentId);
			httpDeleteCommentReq.then(function(response){
				var index = $scope.comments.indexOf(comment);
				$scope.comments.splice(index, 1);
			})
		}

		var questionId = $routeParams.id;
		var httpGetQuestion = questionService.getSingleQuestion(questionId);

		$scope.moment = moment;

		httpGetQuestion.then(function(response){
			$scope.question = response.data.question
			$scope.comments = response.data.comments.reverse();
			$scope.newComment = {};
		}, function(){
			
		});

		$scope.$watch(function(){
			return sessionService.isAuthorized
		}, function(){
			$scope.userSession = sessionService.isAuthorized;
			$scope.user = sessionService.currentUser();
		});

	});