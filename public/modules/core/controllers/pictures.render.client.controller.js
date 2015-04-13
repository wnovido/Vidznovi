/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureRenderController', ['$scope','$stateParams', 'Pictures',
    function($scope, $stateParams, Pictures) {

        $scope.pathname = "modules/core/img/slider/";
        $scope.pictures = Pictures.query();
        $scope.albumid = $stateParams.albumid;

    }
]);
