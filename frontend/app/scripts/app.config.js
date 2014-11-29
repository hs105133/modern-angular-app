(function () {
	'use strict';
	angular.module('jobApp')
		.config(function($stateProvider, $urlRouterProvider, $httpProvider){

			$urlRouterProvider.otherwise('/home');

			$stateProvider.state('home', {
				url: '/home',
				templateUrl: 'views/main.html'	
			})
			.state('jobs',{
				url: '/jobs',
				templateUrl: 'views/jobs.html',
				controller: 'JobsCtrl'	
			})
			.state('register',{
				url: '/register',
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl'	
			})
			.state('login',{
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'	
			})
			.state('logout',{
				url: '/logout',
 				controller: 'LogoutCtrl'	
			});

			$httpProvider.interceptors.push('authInterceptor');
		})

		.constant('BASE_URL', 'http://localhost:5000/');
})(); 