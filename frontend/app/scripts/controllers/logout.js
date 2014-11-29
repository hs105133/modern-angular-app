'use strict';

angular.module('jobApp')
  .controller('LogoutCtrl', function(authToken, $state) {
    	authToken.removeToken();
    	$state.go('home');
  });
