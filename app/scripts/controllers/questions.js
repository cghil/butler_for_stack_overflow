'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
    .controller('QuestionsCtrl', function(questionService, $http, $scope, $log, sessionService) {
        $scope.userSession = sessionService.isAuthorized;

        $scope.$watch(function() {
            return sessionService.isAuthorized
        }, function() {
            $scope.userSession = sessionService.isAuthorized;
            $scope.user = sessionService.currentUser();
        });

        var httpQuestions = questionService.getQuestions();

        $scope.showQuestionForm = false;

        $scope.changeShowStatusQuestionForm = function() {
            $scope.showQuestionForm = !$scope.showQuestionForm
        };


        httpQuestions.then(function(response) {
            $scope.questions = response.data.questions.reverse();
        }, function(response) {
            $log.log('An error occurred; could not reach resource');
        });

        $scope.question = {};

        $scope.submit = function(){
            $scope.question.user_id = sessionStorage.id;
            var question = {question: $scope.question};
            var http = questionService.createQuestions(sessionStorage.token, question);
            http.then(function(response){
                $scope.questions.unshift(response.data);
                $scope.question = {};
                $scope.changeShowStatusQuestionForm();
            }, function(response){
                if (response.status === 500) {
                    $scope.reqs = [];
                    $scope.reqs.push(response.statusText);
                    $scope.showReqs = $scope.reqs.length;
                } else {
                    $scope.reqs = [];

                    var errors = response.data.errors || 'Internal Error';

                    $scope.reqs.push(errors);
                    $scope.showReqs = $scope.reqs.length;
                }
            });
        };

    });