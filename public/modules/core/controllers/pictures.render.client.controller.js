/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core').controller('PictureRenderController', ['$scope','$stateParams', 'Pictures', 'Albums', 'Albumgroups',
    function($scope, $stateParams, Pictures, Albums, Albumgroups) {

        //$scope.pathname = 'modules/core/img/slider/';

        $scope.pictures = Pictures.query();
        $scope.albumFilter = $stateParams.albumId;

        $scope.album = $stateParams.album;
        $scope.albumId = $stateParams.albumId;
        //$scope.albumgroupId = $stateParams.albumgroupId;
        console.log($stateParams.albumId);
        console.log($stateParams.albumName);
        console.log($stateParams.albumgroupName);
        //$scope.album = Albums.get({
        //    albumId: $stateParams.album._id
        //});


        //$scope.albumgroup = Albumgroups.get(albumgroupId);
        $scope.pathname = 'photoalbums/' + $stateParams.albumgroupName + '/' + $stateParams.albumName + '/';
        console.log($scope.pathname);

    }
]);
