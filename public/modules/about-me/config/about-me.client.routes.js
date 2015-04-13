'use strict';

//Setting up route
angular.module('about-me').config(['$stateProvider',
	function($stateProvider) {
		// About me state routing
		$stateProvider.
		state('about-me', {
			url: '/about-me',
			templateUrl: 'modules/about-me/views/about-me.client.view.html'
		});
	}
]);