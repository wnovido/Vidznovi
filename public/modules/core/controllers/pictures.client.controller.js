/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core')

.controller('PictureController', ['$scope',
    function($scope) {
        // Aboutme controller logic
        // ...
        $scope.pictures = [{
            filepath: "modules/albums/places/1265282_10202300476172512_195772845_o.jpg"
        },
            {
                filepath: "modules/albums/places/1265390_10202300464212213_950848158_o.jpg"
            },
            {
                filepath: "modules/albums/places/1265744_10202300448531821_1722655269_o.jpg"
            }

        ];
    }
]);