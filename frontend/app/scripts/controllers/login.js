'use strict';

angular.module('jobApp')
  .controller('LoginCtrl', function ($scope, alert, auth) {
    $scope.formData = {};

    $scope.loginUser = function(formData){
    	auth.authenticate('login', formData)
    		.success(function(res){
    			alert('success', 'Welcome', 'Thanks for coming back '+ res.user.email);
    		})
    		.error(function(err){
    			alert('warning', 'Something went wrong', err.message);
    		});
    };
  });
