'use strict';

/**
 * @ngdoc function
 * @name myAuthApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the myAuthApp
 */
angular.module('myAuthApp')
  .controller('UsersCtrl', function ($scope, sessionService) {

   	sessionService.redirectNotAuthenticated();
    
  });
