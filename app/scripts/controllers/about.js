'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
