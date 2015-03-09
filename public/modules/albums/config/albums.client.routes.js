'use strict';

//Setting up route
angular.module('albums').config(['$stateProvider',
	function($stateProvider) {
		// Albums state routing
		$stateProvider.
		state('aboutme', {
			url: '/aboutme',
			templateUrl: 'modules/albums/views/aboutme.client.view.html'
		}).
		state('listAlbums', {
			url: '/albums',
			templateUrl: 'modules/albums/views/list-albums.client.view.html'
		}).
		state('createAlbum', {
			url: '/albums/create',
			templateUrl: 'modules/albums/views/create-album.client.view.html'
		}).
		state('viewAlbum', {
			url: '/albums/:albumId',
			templateUrl: 'modules/albums/views/view-album.client.view.html'
		}).
		state('editAlbum', {
			url: '/albums/:albumId/edit',
			templateUrl: 'modules/albums/views/edit-album.client.view.html'
		});
	}
]);