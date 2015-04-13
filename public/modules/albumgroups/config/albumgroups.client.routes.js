'use strict';

//Setting up route
angular.module('albumgroups').config(['$stateProvider',
	function($stateProvider) {
		// Albumgroups state routing
		$stateProvider.
		state('listAlbumgroups', {
			url: '/albumgroups',
			templateUrl: 'modules/albumgroups/views/list-albumgroups.client.view.html'
		}).
		state('createAlbumgroup', {
			url: '/albumgroups/create',
			templateUrl: 'modules/albumgroups/views/create-albumgroup.client.view.html'
		}).
		state('viewAlbumgroup', {
			url: '/albumgroups/:albumgroupId',
			templateUrl: 'modules/albumgroups/views/view-albumgroup.client.view.html'
		}).
		state('editAlbumgroup', {
			url: '/albumgroups/:albumgroupId/edit',
			templateUrl: 'modules/albumgroups/views/edit-albumgroup.client.view.html'
		});
	}
]);