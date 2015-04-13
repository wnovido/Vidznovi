'use strict';

(function() {
	// Albumgroups Controller Spec
	describe('Albumgroups Controller Tests', function() {
		// Initialize global variables
		var AlbumgroupsController,
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

			// Initialize the Albumgroups controller.
			AlbumgroupsController = $controller('AlbumgroupsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Albumgroup object fetched from XHR', inject(function(Albumgroups) {
			// Create sample Albumgroup using the Albumgroups service
			var sampleAlbumgroup = new Albumgroups({
				name: 'New Albumgroup'
			});

			// Create a sample Albumgroups array that includes the new Albumgroup
			var sampleAlbumgroups = [sampleAlbumgroup];

			// Set GET response
			$httpBackend.expectGET('albumgroups').respond(sampleAlbumgroups);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.albumgroups).toEqualData(sampleAlbumgroups);
		}));

		it('$scope.findOne() should create an array with one Albumgroup object fetched from XHR using a albumgroupId URL parameter', inject(function(Albumgroups) {
			// Define a sample Albumgroup object
			var sampleAlbumgroup = new Albumgroups({
				name: 'New Albumgroup'
			});

			// Set the URL parameter
			$stateParams.albumgroupId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/albumgroups\/([0-9a-fA-F]{24})$/).respond(sampleAlbumgroup);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.albumgroup).toEqualData(sampleAlbumgroup);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Albumgroups) {
			// Create a sample Albumgroup object
			var sampleAlbumgroupPostData = new Albumgroups({
				name: 'New Albumgroup'
			});

			// Create a sample Albumgroup response
			var sampleAlbumgroupResponse = new Albumgroups({
				_id: '525cf20451979dea2c000001',
				name: 'New Albumgroup'
			});

			// Fixture mock form input values
			scope.name = 'New Albumgroup';

			// Set POST response
			$httpBackend.expectPOST('albumgroups', sampleAlbumgroupPostData).respond(sampleAlbumgroupResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Albumgroup was created
			expect($location.path()).toBe('/albumgroups/' + sampleAlbumgroupResponse._id);
		}));

		it('$scope.update() should update a valid Albumgroup', inject(function(Albumgroups) {
			// Define a sample Albumgroup put data
			var sampleAlbumgroupPutData = new Albumgroups({
				_id: '525cf20451979dea2c000001',
				name: 'New Albumgroup'
			});

			// Mock Albumgroup in scope
			scope.albumgroup = sampleAlbumgroupPutData;

			// Set PUT response
			$httpBackend.expectPUT(/albumgroups\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/albumgroups/' + sampleAlbumgroupPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid albumgroupId and remove the Albumgroup from the scope', inject(function(Albumgroups) {
			// Create new Albumgroup object
			var sampleAlbumgroup = new Albumgroups({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Albumgroups array and include the Albumgroup
			scope.albumgroups = [sampleAlbumgroup];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/albumgroups\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAlbumgroup);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.albumgroups.length).toBe(0);
		}));
	});
}());