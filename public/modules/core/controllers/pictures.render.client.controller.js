/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureRenderController', ['$scope','$stateParams', 'Pictures', 'Albums', 'Albumgroups',
    function($scope, $stateParams, Pictures, Albums, Albumgroups) {

        $scope.pictures = Pictures.query();
        $scope.albumFilter = $stateParams.albumId;
        $scope.pathname = 'modules/core/img/photoalbums/' + $stateParams.albumgroupName + '/' + $stateParams.albumName + '/';
        console.log($stateParams.albumId);
        console.log($stateParams.albumgroupName);
        console.log($stateParams.albumName);
        console.log($scope.pathname);

    }
]);
