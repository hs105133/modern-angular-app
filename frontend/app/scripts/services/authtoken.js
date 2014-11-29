'use strict';

/**
 * @ngdoc service
 * @name jobApp.Authtoken
 * @description
 * # Authtoken
 * Service in the jobApp.
 */
angular.module('jobApp')
  .factory('authToken', function ($window, $rootScope) {
  		var storage = $window.localStorage,
  			cachedToken;

  		var factory = {
  			setToken: function(token){
  				cachedToken = token;
  				storage.token = token;
  				$rootScope.isAuthenticated = true;
  			},

  			getToken: function(){
  				if(!cachedToken){
  					return storage.token;
  				}

  				return cachedToken;
  			},

  			isAuthenticated: function(){
  				return !!this.getToken();
  			},

  			removeToken: function(){
  				cachedToken = null;
  				storage.removeItem('token');
          $rootScope.isAuthenticated = false;
  			}
  		};	

  		return factory;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
