'use strict';

//Setting up route
angular.module('contact-us').config(['$stateProvider',
	function($stateProvider) {
		// Contact us state routing
		$stateProvider.
		state('contact-us', {
			url: '/contact-us',
			templateUrl: 'modules/contact-us/views/contact-us.client.view.html'
		});
	}
]);