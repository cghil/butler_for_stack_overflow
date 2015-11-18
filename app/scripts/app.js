'use strict';

/**
 * @ngdoc overview
 * @name myAuthApp
 * @description
 * # myAuthApp
 *
 * Main module of the application.
 */
angular
  .module('myAuthApp', [
    'ENV.development',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('ENV.development', [])
  .constant('myConfig', {
    backend: 'http://localhost:3000'
  });