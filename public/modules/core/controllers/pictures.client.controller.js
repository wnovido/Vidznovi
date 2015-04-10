/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureController', ['$scope',
    function($scope) {
        $scope.pictures = [
            {
                filepath: 'modules/core/img/slider/1.jpg'
            },
            {
                filepath: 'modules/core/img/slider/2.jpg'
            }
        ];


        $scope.picturesbw = [
            {
                filepath: 'modules/core/img/slider/5.jpg'
            },
            {
                filepath: 'modules/core/img/slider/6.jpg'
            }
        ];

        $scope.picturesfaces = [
            {
                filepath: 'modules/core/img/slider/3.jpg'
            },
            {
                filepath: 'modules/core/img/slider/4.jpg'
            }
        ];


    }
]);
