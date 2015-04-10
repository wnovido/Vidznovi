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
            },
            {
                filepath: 'modules/albums/places/DSC_0914.jpg'
            },
            {
                filepath: 'modules/albums/places/DSC_1710.jpg'
            },
            {
                filepath: 'modules/albums/places/DSC_1744.jpg'
            },
            {
                filepath: 'modules/albums/places/DSC_1834.jpg'
            },
            {
                filepath: 'modules/albums/places/DSC_1859.jpg'
            }
        ];


        $scope.picturesbw = [
            {
                filepath: 'modules/albums/B&W/DSC_0464.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_1703.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_1705.jpg'
            }
        ];

        $scope.picturesfaces = [
            {
                filepath: 'modules/albums/faces/DSC_4176.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4192.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4203.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4207.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4225.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4226.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4232.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4272.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4288.jpg'
            },
            {
                filepath: 'modules/albums/faces/DSC_4299.jpg'
            }
        ];


    }
]);