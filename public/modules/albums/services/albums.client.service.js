'use strict';

//Albums service used to communicate Albums REST endpoints
angular.module('albums').factory('Albums', ['$resource',
	function($resource) {
		return $resource('albums/:albumId', { albumId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);