/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureController', ['$scope',
    function($scope) {
        $scope.pictures = [
            {
                filepath: 'modules/albums/places/DSC_0009.jpg'
            },
            {
                filepath: 'modules/albums/places/DSC_0864.jpg'
            }
        ];


        $scope.picturesbw = [
            {
                filepath: 'modules/albums/B&W/DSC_0464.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_1703.jpg'
            }
        ];

        $scope.picturesfaces = [
            {
                filepath: 'modules/albums/faces/DSC_4176.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4192.jpg'
            }
        ];


    }
]);