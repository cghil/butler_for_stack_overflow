'use strict';

/**
 * @ngdoc service
 * @name myAuthApp.sessionService
 * @description
 * # sessionService
 * Factory in the myAuthApp.
 */
angular.module('myAuthApp')
  .factory('sessionService', function ($http, myConfig) {

    var session = {};

    session.signIn = function(user){
      return $http({
        method: 'POST',
        url: myConfig.backend + '/api/v1/sessions',
        data: user,
        headers: {'Content-Type': 'application/json'}
      })
    };

    session.signUp = function(user){
      return $http({
        method: 'POST',
        url: myConfig.backend + '/api/v1/users',
        data: user,
        headers: {'Content-Type': 'application/json'}
      })
    };

    session.logOut = function(user) {
      $http({
        method: 'DELETE',
        url: myConfig.backend + '/api/v1/sessions/' + sessionStorage.token
      }).then(function(response){
        sessionStorage.clear();
      });
    };

    session.showUserAsLoggedOut = function(){
      $http({
        method: 'DELETE',
        url: myConfig.backend + '/api/v1/sessions/' + sessionStorage.token
      }).then(function(response){
        session.isAuthorized = false;
        sessionStorage.clear();
      }, function(response){
        console.log('Error occur please view response: ' + response)
      });
    };

    session.currentUser = function(){
      var user = {
        email: sessionStorage.email,
        token: sessionStorage.token,
        id: sessionStorage.id
      }
      return user
    };

    session.setUser = function(email, token, id){

      sessionStorage.email = email;
      sessionStorage.token = token;
      sessionStorage.id = id;

      var user = {
        email: sessionStorage.email,
        token: sessionStorage.token,
        id: sessionStorage.id
      };

      return user;
    };

    if (!sessionStorage.email && !sessionStorage.token && !sessionStorage.id) {
      session.isAuthorized = false;
    } else {
      session.isAuthorized = true;
    };

    session.showUserAsLoggedIn = function(){
      session.isAuthorized = true;
      console.log('user has logged in')
    };


    // Public API here
    return session;
  });
