'use strict'

angular.module('myAuthApp')
	.service('userService', function($http, $log, myConfig){
		var service = {};

		service.showUser = function(token, userId){
			return $http({
				method: 'GET',
				url: myConfig.backend + '/api/v1/users/' + userId,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
		};

		service.updateUser = function(token, userId, user){
			return $http({
				method: 'PATCH',
				url: myConfig.backend + '/api/v1/users/' + userId,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				data: user
			})
		};

		return service;
	});