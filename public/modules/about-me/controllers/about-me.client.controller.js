'use strict';

angular.module('about-me').controller('AboutMeController', ['$scope', '$rootScope',
	function($scope,$rootScope) {
		// Controller Logic
		// ...
        $scope.aboutme = $rootScope.mainAlbumDir + '/' + 'edna2.jpg';
	}
]);
