'use strict';

//Setting up route
angular.module('app-setups').config(['$stateProvider',
	function($stateProvider) {
		// App setups state routing
		$stateProvider.
		state('listAppSetups', {
			url: '/app-setups',
			templateUrl: 'modules/app-setups/views/list-app-setups.client.view.html'
		}).
		state('createAppSetup', {
			url: '/app-setups/create',
			templateUrl: 'modules/app-setups/views/create-app-setup.client.view.html'
		}).
		state('viewAppSetup', {
			url: '/app-setups/:appSetupId',
			templateUrl: 'modules/app-setups/views/view-app-setup.client.view.html'
		}).
		state('editAppSetup', {
			url: '/app-setups/:appSetupId/edit',
			templateUrl: 'modules/app-setups/views/edit-app-setup.client.view.html'
		});
	}
]);