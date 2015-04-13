'use strict';

// Albumgroups controller
angular.module('albumgroups').controller('AlbumgroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Albumgroups',
	function($scope, $stateParams, $location, Authentication, Albumgroups) {
		$scope.authentication = Authentication;

		// Create new Albumgroup
		$scope.create = function() {
			// Create new Albumgroup object
			var albumgroup = new Albumgroups ({
				name: this.name
			});

			// Redirect after save
			albumgroup.$save(function(response) {
				$location.path('albumgroups/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Albumgroup
		$scope.remove = function(albumgroup) {
			if ( albumgroup ) { 
				albumgroup.$remove();

				for (var i in $scope.albumgroups) {
					if ($scope.albumgroups [i] === albumgroup) {
						$scope.albumgroups.splice(i, 1);
					}
				}
			} else {
				$scope.albumgroup.$remove(function() {
					$location.path('albumgroups');
				});
			}
		};

		// Update existing Albumgroup
		$scope.update = function() {
			var albumgroup = $scope.albumgroup;

			albumgroup.$update(function() {
				$location.path('albumgroups/' + albumgroup._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Albumgroups
		$scope.find = function() {
			$scope.albumgroups = Albumgroups.query();
		};

		// Find existing Albumgroup
		$scope.findOne = function() {
			$scope.albumgroup = Albumgroups.get({ 
				albumgroupId: $stateParams.albumgroupId
			});
		};
	}
]);