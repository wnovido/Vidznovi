'use strict';

//App setups service used to communicate App setups REST endpoints
angular.module('app-setups').factory('AppSetups', ['$resource',
	function($resource) {
		return $resource('app-setups/:appSetupId', { appSetupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);