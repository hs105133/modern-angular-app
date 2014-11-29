'use strict';

angular.module('jobApp')
  .controller('JobsCtrl', function ($scope, $http, alert, BASE_URL) {


    $http.get(BASE_URL+'jobs')
    		.success(function(res){
          console.log(res);
          $scope.jobs = res;
      
    			//alert('success', 'Fetch', 'Welcome, '+ res.user.email);

    		})
    		.error(function(){
    			alert('warning', 'Opps!', 'Could not get Job for');
    		});

  });
