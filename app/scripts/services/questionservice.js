'use strict';

/**
 * @ngdoc service
 * @name myAuthApp.sessionService
 * @description
 * # sessionService
 * Factory in the myAuthApp.
 */
angular.module('myAuthApp')
  .factory('questionService', function ($http, myConfig, $location) {
  	var service = {};

  	service.getQuestions = function(){
  		return $http({
  			method: 'GET',
  			url: myConfig.backend + '/api/v1/questions',
  			headers: {'Content-Type': 'application/json'}
  		})
  	};

  	return service;
  });
