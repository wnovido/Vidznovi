'use strict';

(function() {
	// App setups Controller Spec
	describe('App setups Controller Tests', function() {
		// Initialize global variables
		var AppSetupsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the App setups controller.
			AppSetupsController = $controller('AppSetupsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one App setup object fetched from XHR', inject(function(AppSetups) {
			// Create sample App setup using the App setups service
			var sampleAppSetup = new AppSetups({
				name: 'New App setup'
			});

			// Create a sample App setups array that includes the new App setup
			var sampleAppSetups = [sampleAppSetup];

			// Set GET response
			$httpBackend.expectGET('app-setups').respond(sampleAppSetups);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.appSetups).toEqualData(sampleAppSetups);
		}));

		it('$scope.findOne() should create an array with one App setup object fetched from XHR using a appSetupId URL parameter', inject(function(AppSetups) {
			// Define a sample App setup object
			var sampleAppSetup = new AppSetups({
				name: 'New App setup'
			});

			// Set the URL parameter
			$stateParams.appSetupId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/app-setups\/([0-9a-fA-F]{24})$/).respond(sampleAppSetup);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.appSetup).toEqualData(sampleAppSetup);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(AppSetups) {
			// Create a sample App setup object
			var sampleAppSetupPostData = new AppSetups({
				name: 'New App setup'
			});

			// Create a sample App setup response
			var sampleAppSetupResponse = new AppSetups({
				_id: '525cf20451979dea2c000001',
				name: 'New App setup'
			});

			// Fixture mock form input values
			scope.name = 'New App setup';

			// Set POST response
			$httpBackend.expectPOST('app-setups', sampleAppSetupPostData).respond(sampleAppSetupResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the App setup was created
			expect($location.path()).toBe('/app-setups/' + sampleAppSetupResponse._id);
		}));

		it('$scope.update() should update a valid App setup', inject(function(AppSetups) {
			// Define a sample App setup put data
			var sampleAppSetupPutData = new AppSetups({
				_id: '525cf20451979dea2c000001',
				name: 'New App setup'
			});

			// Mock App setup in scope
			scope.appSetup = sampleAppSetupPutData;

			// Set PUT response
			$httpBackend.expectPUT(/app-setups\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/app-setups/' + sampleAppSetupPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid appSetupId and remove the App setup from the scope', inject(function(AppSetups) {
			// Create new App setup object
			var sampleAppSetup = new AppSetups({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new App setups array and include the App setup
			scope.appSetups = [sampleAppSetup];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/app-setups\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAppSetup);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.appSetups.length).toBe(0);
		}));
	});
}());