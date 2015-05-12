'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication', 'Albums', 'Albumgroups', 'Pictures', 'Core', '$rootScope',
	function($scope, $animate, Authentication, Albums, Albumgroups, Pictures, Core, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$animate.enabled(false);

		$scope.myInterval = 5000;

        // Find a list of Pictures
        $scope.find = function() {
            $scope.pictures = Core.query();
        };

        // Find existing Picture
        //$scope.findOne = function() {
        //    $scope.picture = Core.get({
        //        pictureId: $stateParams.pictureId
        //    });
        //};

		$scope.tabs = Albumgroups.query();
		$scope.albums = Albums.query();
		$scope.slides = Core.query();

        $rootScope.mainAlbumDir = 'modules/core/img/photoalbums';
		$rootScope.sliderAlbum = 'b&w';

        // Get the slider album here
        //var tmp = AppSetup.get({appSetupName: 'Main Album Directory'});
        //tmp.$promise.then(function(data) {
        //    $rootScope.mainAlbumDir = data.value;
        //});
        //
        //tmp = AppSetup.get({appSetupName: 'Carousel Album'});
        //tmp.$promise.then(function(data) {
        //    $rootScope.carouselAlbum = data.value;
        //    console.log($rootScope.carouselAlbum);
        //$scope.slides  = CarouselAlbum.query({albumId: '55473b35eb5df27827e5c1ab'});
        //CarouselAlbum.query({
        //    albumId: '55473b35eb5df27827e5c1ab'
        //}, function(albumTmp) {
        //    $scope.slides = albumTmp;
        //    console.log($scope.slides);
        //});

            //tmp.$promise.then(function(data) {
            //    $scope.slides = data;
            //});

        //});




        // Find existing Picture, I think this can be done in the server, returning the picture's album group
		$scope.initImg = function(_id) {
			var album = Albums.get({
				albumId: _id
			});

			album.$promise.then(function(data) {
				$scope.albumName = data.name;

				var albumgroup = Albumgroups.get({
					albumgroupId: data.albumgroup
				});

				albumgroup.$promise.then(function(data) {
					$scope.albumgroupName = data.name;
				});
			});
		};
	}
]);
