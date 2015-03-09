'use strict';

(function() {
	// Albums Controller Spec
	describe('Albums Controller Tests', function() {
		// Initialize global variables
		var AlbumsController,
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

			// Initialize the Albums controller.
			AlbumsController = $controller('AlbumsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Album object fetched from XHR', inject(function(Albums) {
			// Create sample Album using the Albums service
			var sampleAlbum = new Albums({
				name: 'New Album'
			});

			// Create a sample Albums array that includes the new Album
			var sampleAlbums = [sampleAlbum];

			// Set GET response
			$httpBackend.expectGET('albums').respond(sampleAlbums);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.albums).toEqualData(sampleAlbums);
		}));

		it('$scope.findOne() should create an array with one Album object fetched from XHR using a albumId URL parameter', inject(function(Albums) {
			// Define a sample Album object
			var sampleAlbum = new Albums({
				name: 'New Album'
			});

			// Set the URL parameter
			$stateParams.albumId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/albums\/([0-9a-fA-F]{24})$/).respond(sampleAlbum);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.album).toEqualData(sampleAlbum);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Albums) {
			// Create a sample Album object
			var sampleAlbumPostData = new Albums({
				name: 'New Album'
			});

			// Create a sample Album response
			var sampleAlbumResponse = new Albums({
				_id: '525cf20451979dea2c000001',
				name: 'New Album'
			});

			// Fixture mock form input values
			scope.name = 'New Album';

			// Set POST response
			$httpBackend.expectPOST('albums', sampleAlbumPostData).respond(sampleAlbumResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Album was created
			expect($location.path()).toBe('/albums/' + sampleAlbumResponse._id);
		}));

		it('$scope.update() should update a valid Album', inject(function(Albums) {
			// Define a sample Album put data
			var sampleAlbumPutData = new Albums({
				_id: '525cf20451979dea2c000001',
				name: 'New Album'
			});

			// Mock Album in scope
			scope.album = sampleAlbumPutData;

			// Set PUT response
			$httpBackend.expectPUT(/albums\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/albums/' + sampleAlbumPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid albumId and remove the Album from the scope', inject(function(Albums) {
			// Create new Album object
			var sampleAlbum = new Albums({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Albums array and include the Album
			scope.albums = [sampleAlbum];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/albums\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAlbum);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.albums.length).toBe(0);
		}));
	});
}());