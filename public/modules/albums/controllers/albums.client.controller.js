'use strict';

// Albums controller
angular.module('albums').controller('AlbumsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Albums',
	function($scope, $stateParams, $location, Authentication, Albums) {
		$scope.authentication = Authentication;

		// Create new Album
		$scope.create = function() {
			// Create new Album object
			var album = new Albums ({
				name: this.name,
				thumbnail: this.thumbnail
			});

			// Redirect after save
			album.$save(function(response) {
				$location.path('albums/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Album
		$scope.remove = function(album) {
			if ( album ) { 
				album.$remove();

				for (var i in $scope.albums) {
					if ($scope.albums [i] === album) {
						$scope.albums.splice(i, 1);
					}
				}
			} else {
				$scope.album.$remove(function() {
					$location.path('albums');
				});
			}
		};

		// Update existing Album
		$scope.update = function() {
			var album = $scope.album;

			album.$update(function() {
				$location.path('albums/' + album._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Albums
		$scope.find = function() {
			$scope.albums = Albums.query();
		};

		// Find existing Album
		$scope.findOne = function() {
			$scope.album = Albums.get({ 
				albumId: $stateParams.albumId
			});
		};
	}
]);