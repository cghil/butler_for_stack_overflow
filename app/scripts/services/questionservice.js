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

    service.createQuestions = function(token, question){
      return $http({
        method: 'POST',
        url: myConfig.backend + '/api/v1/questions',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        data: question
      })
    };

    service.getSingleQuestion = function(questionId){
      return $http({
        method: 'GET',
        url: myConfig.backend + '/api/v1/questions/' + questionId,
        headers: {'Content-Type' : 'application/json'}
      })
    };

  	return service;
  });
