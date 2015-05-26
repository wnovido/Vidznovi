'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication', 'Albums', 'Albumgroups', 'Pictures', 'Core', 'AppSetup', '$rootScope',
	function($scope, $animate, Authentication, Albums, Tabs, Pictures, Core, AppSetup, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$animate.enabled(false);

		$scope.myInterval = 5000;
		$scope.tabs = Tabs.query();
		$scope.albums = Albums.query();
		$scope.slides = Core.query();


        // Get the main album directory from db, can be changed in the future, could be in the server
        var tmp = AppSetup.get({appSetupName: 'Main Album Directory'});
        tmp.$promise.then(function(data) {
            $rootScope.mainAlbumDir = data.value;
        });


        // Find existing Picture, I think this can be done in the server, returning the picture's album group
		$scope.initImg = function(_id) {
			var album = Albums.get({
				albumId: _id
			});

			album.$promise.then(function(data) {
				$scope.albumName = data.name;

				var albumgroup = Tabs.get({
					albumgroupId: data.albumgroup
				});

				albumgroup.$promise.then(function(data) {
					$scope.albumgroupName = data.name;
				});
			});
		};
	}
]);
