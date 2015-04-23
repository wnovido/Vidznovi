/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureRenderController', ['$scope','$stateParams', 'Pictures',
    function($scope, $stateParams, Pictures) {

        $scope.pictures = Pictures.query();
        $scope.albumFilter = $stateParams.albumId;
        $scope.pathname = 'modules/core/img/photoalbums/' + $stateParams.albumgroupName + '/' + $stateParams.albumName + '/';

    }
]);
