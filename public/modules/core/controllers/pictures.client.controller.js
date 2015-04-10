/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureController', ['$scope',
    function($scope) {
        $scope.pictures = [
            {
            filepath: 'modules/albums/places/1265282_10202300476172512_195772845_o.jpg'
            },
            {
                filepath: 'modules/albums/places/1265390_10202300464212213_950848158_o.jpg'
            },
            {
                filepath: 'modules/albums/places/1265744_10202300448531821_1722655269_o.jpg'
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
                filepath: 'modules/albums/B&W/DSC_4176.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4192.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4203.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4207.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4225.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4226.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4232.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4272.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4288.jpg'
            },
            {
                filepath: 'modules/albums/B&W/DSC_4299.jpg'
            }
        ];


    }
]);