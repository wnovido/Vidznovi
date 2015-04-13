'use strict';

//Albumgroups service used to communicate Albumgroups REST endpoints
angular.module('albumgroups').factory('Albumgroups', ['$resource',
	function($resource) {
		return $resource('albumgroups/:albumgroupId', { albumgroupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);