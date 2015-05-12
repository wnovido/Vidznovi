'use strict';

angular.module('core')
//.factory('AppSetup', ['$resource',
//    function($resource) {
//        var resource;
//
//        resource = $resource('appSetup/:appSetupName', { appSetupName: ''
//        }, {
//            update: {
//                method: 'PUT'
//            },
//            query: {
//                method: 'GET',
//                isArray: false
//            }
//        });
//
//        return resource;
//    }
//])

.factory('CarouselAlbum', ['$resource',
    function($resource) {
        var resource;
        resource = $resource('carousel/:albumId', { albumId: ''
        }, {
            update: {
                method: 'PUT'
            }
        });

        return resource;
    }
])

;
