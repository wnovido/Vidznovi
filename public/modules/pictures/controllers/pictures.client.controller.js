'use strict';

// Pictures controller
angular.module('pictures').controller('PicturesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pictures', 'Albums', 'Albumgroups', '$modal',
	function($scope, $stateParams, $location, Authentication, Pictures, Albums, Albumgroups) {
		$scope.authentication = Authentication;



		// Create new Picture
		$scope.create = function() {
			// Create new Picture object
			var picture = new Pictures ({
				name: this.name,
				filename: this.filename,
				album: this.album
			});

			// Redirect after save
			picture.$save(function(response) {
				$location.path('pictures');

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Picture
		$scope.remove = function(picture) {
			if ( picture ) { 
				picture.$remove();

				for (var i in $scope.pictures) {
					if ($scope.pictures [i] === picture) {
						$scope.pictures.splice(i, 1);
					}
				}
			} else {
				$scope.picture.$remove(function() {
					$location.path('pictures');
				});
			}
		};

		// Update existing Picture
		$scope.update = function() {
			var picture = $scope.picture;

			picture.$update(function() {
				$location.path('pictures');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pictures
		$scope.find = function() {
			$scope.pictures = Pictures.query();
		};

		// Find existing Picture
		$scope.findOne = function() {
			$scope.picture = Pictures.get({ 
				pictureId: $stateParams.pictureId
			});
		};

		$scope.albums = Albums.query();
		$scope.pictures = Pictures.query();
		$scope.displayedPictures = [].concat($scope.pictures);

		// Find existing Picture, I think this can be done in the server, returning the picture's album group
		$scope.initImg = function(_albumgroupId) {
				//var albumgroup = Albumgroups.get({
				//	albumgroupId: _albumgroupId
				//});
            var albumgroup = {};
            albumgroup.albumgroupId = _albumgroupId;

			//$scope.albumgroupx = Albumgroups.get(albumgroup);
			return albumgroup;

				//albumgroup.$promise.then(function(data) {
				//	$scope.albumgroupName = data.name;
				//	return data.name;
				//});

				//return false;
		};

	}
]);
