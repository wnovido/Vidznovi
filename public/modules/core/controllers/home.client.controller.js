'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication', 'Albums', 'Albumgroups', 'Pictures', '$rootScope',
	function($scope, $animate, Authentication, Albums, Albumgroups, Pictures, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$animate.enabled(false);

		$scope.myInterval = 5000;

		$scope.tabs = Albumgroups.query();
		$scope.albums = Albums.query();
		$scope.slides = Pictures.query();

		$rootScope.mainAlbumDir = 'modules/core/img/photoalbums';
		$rootScope.sliderAlbum = 'b&w';

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
