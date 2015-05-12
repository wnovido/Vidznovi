'use strict';

//Pictures service used to communicate Pictures REST endpoints
angular.module('core').factory('Core', ['$resource',
    function($resource) {
        return $resource('core', {
            update: {
                method: 'PUT'
            }
        });
    }
])

.factory('AppSetup', ['$resource',
    function($resource) {
        var resource;
        resource = $resource('appSetup/:appSetupName', { appSetupName: ''
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        });

        return resource;
    }
])

;
