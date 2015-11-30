'use strict';

/**
 * @ngdoc service
 * @name myAuthApp.sessionService
 * @description
 * # sessionService
 * Factory in the myAuthApp.
 */
angular.module('myAuthApp')
  .factory('sessionService', function ($http, myConfig, $location) {

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
      return user;
    };

    session.setUser = function(email, token, id, username, gravatar){

      sessionStorage.email = email;
      sessionStorage.token = token;
      sessionStorage.id = id;
      sessionStorage.username = username;
      sessionStorage.gravatar = gravatar;

      var user = {
        email: sessionStorage.email,
        token: sessionStorage.token,
        id: sessionStorage.id,
        username: sessionStorage.username,
        gravatar: sessionStorage.gravatar
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

    session.isUserAuthorized = function(){
      if(sessionStorage.token === undefined){
        return false;
      } else {
        if (sessionStorage.token.length === 20 && sessionStorage.length && sessionStorage.hasOwnProperty('token') && sessionStorage.hasOwnProperty('email')){
          return true;
        } else {
          return false;
        }
      }
    };

    session.redirectNotAuthenticated = function(){
      if(!this.isUserAuthorized()){
        $location.path('/signin');
      }
    }

    // Public API here
    return session;
  });
