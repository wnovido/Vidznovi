'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Album = mongoose.model('Album'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, album;

/**
 * Album routes tests
 */
describe('Album CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Album
		user.save(function() {
			album = {
				name: 'Album Name'
			};

			done();
		});
	});

	it('should be able to save Album instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Album
				agent.post('/albums')
					.send(album)
					.expect(200)
					.end(function(albumSaveErr, albumSaveRes) {
						// Handle Album save error
						if (albumSaveErr) done(albumSaveErr);

						// Get a list of Albums
						agent.get('/albums')
							.end(function(albumsGetErr, albumsGetRes) {
								// Handle Album save error
								if (albumsGetErr) done(albumsGetErr);

								// Get Albums list
								var albums = albumsGetRes.body;

								// Set assertions
								(albums[0].user._id).should.equal(userId);
								(albums[0].name).should.match('Album Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Album instance if not logged in', function(done) {
		agent.post('/albums')
			.send(album)
			.expect(401)
			.end(function(albumSaveErr, albumSaveRes) {
				// Call the assertion callback
				done(albumSaveErr);
			});
	});

	it('should not be able to save Album instance if no name is provided', function(done) {
		// Invalidate name field
		album.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Album
				agent.post('/albums')
					.send(album)
					.expect(400)
					.end(function(albumSaveErr, albumSaveRes) {
						// Set message assertion
						(albumSaveRes.body.message).should.match('Please fill Album name');
						
						// Handle Album save error
						done(albumSaveErr);
					});
			});
	});

	it('should be able to update Album instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Album
				agent.post('/albums')
					.send(album)
					.expect(200)
					.end(function(albumSaveErr, albumSaveRes) {
						// Handle Album save error
						if (albumSaveErr) done(albumSaveErr);

						// Update Album name
						album.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Album
						agent.put('/albums/' + albumSaveRes.body._id)
							.send(album)
							.expect(200)
							.end(function(albumUpdateErr, albumUpdateRes) {
								// Handle Album update error
								if (albumUpdateErr) done(albumUpdateErr);

								// Set assertions
								(albumUpdateRes.body._id).should.equal(albumSaveRes.body._id);
								(albumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Albums if not signed in', function(done) {
		// Create new Album model instance
		var albumObj = new Album(album);

		// Save the Album
		albumObj.save(function() {
			// Request Albums
			request(app).get('/albums')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Album if not signed in', function(done) {
		// Create new Album model instance
		var albumObj = new Album(album);

		// Save the Album
		albumObj.save(function() {
			request(app).get('/albums/' + albumObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', album.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Album instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Album
				agent.post('/albums')
					.send(album)
					.expect(200)
					.end(function(albumSaveErr, albumSaveRes) {
						// Handle Album save error
						if (albumSaveErr) done(albumSaveErr);

						// Delete existing Album
						agent.delete('/albums/' + albumSaveRes.body._id)
							.send(album)
							.expect(200)
							.end(function(albumDeleteErr, albumDeleteRes) {
								// Handle Album error error
								if (albumDeleteErr) done(albumDeleteErr);

								// Set assertions
								(albumDeleteRes.body._id).should.equal(albumSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Album instance if not signed in', function(done) {
		// Set Album user 
		album.user = user;

		// Create new Album model instance
		var albumObj = new Album(album);

		// Save the Album
		albumObj.save(function() {
			// Try deleting Album
			request(app).delete('/albums/' + albumObj._id)
			.expect(401)
			.end(function(albumDeleteErr, albumDeleteRes) {
				// Set message assertion
				(albumDeleteRes.body.message).should.match('User is not logged in');

				// Handle Album error error
				done(albumDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Album.remove().exec();
		done();
	});
});