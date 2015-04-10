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

        $scope.pictures = pictArray[$stateParams.flagId];
    }
]);
