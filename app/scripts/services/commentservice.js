'use strict'

angular.module('myAuthApp')
	.factory('commentService', function($http, myConfig, $location){
		var service = {};

		service.createComment = function(token, comment){
			return $http({
				method: 'POST',
				url: myConfig.backend + '/api/v1/questions/' + comment.question_id + '/comments',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				data: comment
			})
		};

		service.deleteComment = function(token, commentId){
			return $http({
				method: 'DELETE',
				url: myConfig.backend + '/api/v1/comments/' + commentId,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
		};

		return service;
	});