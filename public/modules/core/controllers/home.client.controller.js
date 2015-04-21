'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication', 'Albums', 'Albumgroups', 'Pictures',
	function($scope, $animate, Authentication, Albums, Albumgroups, Pictures) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$animate.enabled(false);

		$scope.myInterval = 5000;

		$scope.tabs = Albumgroups.query();
		$scope.albums = Albums.query();
		$scope.slides = Pictures.query();

		// Find existing Picture
		$scope.initImg = function(_id) {
			var album = Albums.get({
				albumId: _id
			});
			$scope.albumgroup = Albumgroups.get({
				albumgroupId: album.albumgroup
			});

		};
	}
]);
