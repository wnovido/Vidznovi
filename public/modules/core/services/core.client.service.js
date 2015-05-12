'use strict';

//Pictures service used to communicate Pictures REST endpoints
angular.module('core').factory('Core', ['$resource',
    function($resource) {
        return $resource('core/:pictureId', { pictureId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
