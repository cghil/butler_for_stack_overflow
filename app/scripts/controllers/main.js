'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
