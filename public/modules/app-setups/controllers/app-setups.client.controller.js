'use strict';

// App setups controller
angular.module('app-setups').controller('AppSetupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'AppSetups',
	function($scope, $stateParams, $location, Authentication, AppSetups) {
		$scope.authentication = Authentication;

		// Create new App setup
		$scope.create = function() {
			// Create new App setup object
			var appSetup = new AppSetups ({
				name: this.name,
				description: this.description,
				value: this.value
			});

			// Redirect after save
			appSetup.$save(function(response) {
				$location.path('app-setups/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.value = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing App setup
		$scope.remove = function(appSetup) {
			if ( appSetup ) { 
				appSetup.$remove();

				for (var i in $scope.appSetups) {
					if ($scope.appSetups [i] === appSetup) {
						$scope.appSetups.splice(i, 1);
					}
				}
			} else {
				$scope.appSetup.$remove(function() {
					$location.path('app-setups');
				});
			}
		};

		// Update existing App setup
		$scope.update = function() {
			var appSetup = $scope.appSetup;

			appSetup.$update(function() {
				$location.path('app-setups/' + appSetup._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of App setups
		$scope.find = function() {
			$scope.appSetups = AppSetups.query();
		};

		// Find existing App setup
		$scope.findOne = function() {
			$scope.appSetup = AppSetups.get({ 
				appSetupId: $stateParams.appSetupId
			});
		};
	}
]);
