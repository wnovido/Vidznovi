'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('pictures', {
			url: '/pictures/:flagId',
			templateUrl: 'modules/core/views/pictures.client.view.html'
		})
		.state('faces', {
			url: '/picturesfaces',
			templateUrl: 'modules/core/views/picturesfaces.client.view.html'
		})
		.state('b&w', {
			url: '/picturesb&w',
			templateUrl: 'modules/core/views/picturesbw.client.view.html'
		})

		;
	}
]);