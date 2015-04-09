'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
])


	.controller('PictureController', ['$scope',
		function($scope) {
			// Aboutme controller logic
			// ...
			$scope.pictures = [{
				filepath: "modules/albums/places/1265282_10202300476172512_195772845_o.jpg"
			},
				{
					filepath: "modules/albums/places/1265390_10202300464212213_950848158_o.jpg"
				},
				{
					filepath: "modules/albums/places/1265744_10202300448531821_1722655269_o.jpg"
				}

			];
		}
	]);