'use strict';

angular.module('core').factory('Core', ['$resource',
    function($resource) {
        var resource;

        resource = $resource('core/:appSetupName', { appSetupName: ''
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
]);
