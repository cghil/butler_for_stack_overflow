'use strict';

/**
 * @ngdoc service
 * @name myAuthApp.validationService
 * @description
 * # validationService
 * Service in the myAuthApp.
 */
angular.module('myAuthApp')
  .service('validationService', function () {

  	this.isLongEnough = function(pwd){
  		return pwd.length > 7;
  	}

  	this.hasANumber = function(pwd) {
        return /[0-9]/.test(pwd);
    };

    this.arePasswordsMatching = function(pwd1, pwd2) {
      if (pwd1 !== pwd2) {
        return true;
      } else {
        return false;
      }
    }

    this.isGreaterThanFourCharacters = function(string){
      return string.length > 4;
    }

    this.isEmailValid = function(email){
    	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	return !re.test(email);
    };

  });
