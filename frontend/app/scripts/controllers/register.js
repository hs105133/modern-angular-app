'use strict';

angular.module('jobApp')
  .controller('RegisterCtrl', function ($scope, alert, auth) {
  	$scope.formData = {};

    $scope.addUser = function(formData){

    	auth.authenticate('register', formData)
    		.success(function(res){
    			alert('success', 'Account Created!', 'Welcome, '+ res.user.email);
    		})
    		.error(function(err){
    			alert('warning', 'Something went wrong', err.message);
    		});
    };
  });
