/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureController', ['$scope','$stateParams',
    function($scope, $stateParams) {
        var pictArray = [];
        pictArray[0] = [
            {
                filepath: 'modules/core/img/slider/1.jpg'
            },
            {
                filepath: 'modules/core/img/slider/2.jpg'
            }
        ];


        pictArray[2] = [
            {
                filepath: 'modules/core/img/slider/5.jpg'
            },
            {
                filepath: 'modules/core/img/slider/6.jpg'
            }
        ];


        pictArray[1] = [
            {
                filepath: 'modules/core/img/slider/3.jpg'
            },
            {
                filepath: 'modules/core/img/slider/4.jpg'
            }
        ];

        pictArray[3] = [
            {
                filepath: 'modules/core/img/slider/7.jpg'
            },
            {
                filepath: 'modules/core/img/slider/8.jpg'
            }
        ];

        pictArray[4] = [
            {
                filepath: 'modules/core/img/slider/9.jpg'
            },
            {
                filepath: 'modules/core/img/slider/10.jpg'
            }
        ];


        pictArray[5] = [
            {
                filepath: 'modules/core/img/slider/11.jpg'
            },
            {
                filepath: 'modules/core/img/slider/12.jpg'
            }
        ];


        pictArray[6] = [
            {
                filepath: 'modules/core/img/slider/13.jpg'
            },
            {
                filepath: 'modules/core/img/slider/14.jpg'
            }
        ];

        pictArray[7] = [
            {
                filepath: 'modules/core/img/slider/15.jpg'
            },
            {
                filepath: 'modules/core/img/slider/16.jpg'
            }
        ];

        pictArray[8] = [
            {
                filepath: 'modules/core/img/slider/17.jpg'
            },
            {
                filepath: 'modules/core/img/slider/18.jpg'
            }
        ];


        pictArray[9] = [
            {
                filepath: 'modules/core/img/slider/19.jpg'
            }
        ];


        pictArray[10] = [
            {
                filepath: 'modules/core/img/slider/20.jpg'
            }
        ];

        $scope.pictures = pictArray[$stateParams.flagId];
    }
]);
