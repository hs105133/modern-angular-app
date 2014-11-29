'use strict';

/**
 * @ngdoc service
 * @name jobApp.Auth
 * @description
 * # Auth
 * Service in the jobApp.
 */
angular.module('jobApp')
  .service('auth', function ($http, $state, BASE_URL, authToken) {
  	// login & register
  	this.authenticate = function(url, formData){
  		return  $http.post(BASE_URL+url, formData)
  					.success(function(res){
  						authToken.setToken(res.token);
  						$state.go('home');
  					});
  	};
  });
