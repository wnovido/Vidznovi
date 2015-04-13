'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Albumgroup = mongoose.model('Albumgroup'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, albumgroup;

/**
 * Albumgroup routes tests
 */
describe('Albumgroup CRUD tests', function() {
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

		// Save a user to the test db and create new Albumgroup
		user.save(function() {
			albumgroup = {
				name: 'Albumgroup Name'
			};

			done();
		});
	});

	it('should be able to save Albumgroup instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Albumgroup
				agent.post('/albumgroups')
					.send(albumgroup)
					.expect(200)
					.end(function(albumgroupSaveErr, albumgroupSaveRes) {
						// Handle Albumgroup save error
						if (albumgroupSaveErr) done(albumgroupSaveErr);

						// Get a list of Albumgroups
						agent.get('/albumgroups')
							.end(function(albumgroupsGetErr, albumgroupsGetRes) {
								// Handle Albumgroup save error
								if (albumgroupsGetErr) done(albumgroupsGetErr);

								// Get Albumgroups list
								var albumgroups = albumgroupsGetRes.body;

								// Set assertions
								(albumgroups[0].user._id).should.equal(userId);
								(albumgroups[0].name).should.match('Albumgroup Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Albumgroup instance if not logged in', function(done) {
		agent.post('/albumgroups')
			.send(albumgroup)
			.expect(401)
			.end(function(albumgroupSaveErr, albumgroupSaveRes) {
				// Call the assertion callback
				done(albumgroupSaveErr);
			});
	});

	it('should not be able to save Albumgroup instance if no name is provided', function(done) {
		// Invalidate name field
		albumgroup.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Albumgroup
				agent.post('/albumgroups')
					.send(albumgroup)
					.expect(400)
					.end(function(albumgroupSaveErr, albumgroupSaveRes) {
						// Set message assertion
						(albumgroupSaveRes.body.message).should.match('Please fill Albumgroup name');
						
						// Handle Albumgroup save error
						done(albumgroupSaveErr);
					});
			});
	});

	it('should be able to update Albumgroup instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Albumgroup
				agent.post('/albumgroups')
					.send(albumgroup)
					.expect(200)
					.end(function(albumgroupSaveErr, albumgroupSaveRes) {
						// Handle Albumgroup save error
						if (albumgroupSaveErr) done(albumgroupSaveErr);

						// Update Albumgroup name
						albumgroup.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Albumgroup
						agent.put('/albumgroups/' + albumgroupSaveRes.body._id)
							.send(albumgroup)
							.expect(200)
							.end(function(albumgroupUpdateErr, albumgroupUpdateRes) {
								// Handle Albumgroup update error
								if (albumgroupUpdateErr) done(albumgroupUpdateErr);

								// Set assertions
								(albumgroupUpdateRes.body._id).should.equal(albumgroupSaveRes.body._id);
								(albumgroupUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Albumgroups if not signed in', function(done) {
		// Create new Albumgroup model instance
		var albumgroupObj = new Albumgroup(albumgroup);

		// Save the Albumgroup
		albumgroupObj.save(function() {
			// Request Albumgroups
			request(app).get('/albumgroups')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Albumgroup if not signed in', function(done) {
		// Create new Albumgroup model instance
		var albumgroupObj = new Albumgroup(albumgroup);

		// Save the Albumgroup
		albumgroupObj.save(function() {
			request(app).get('/albumgroups/' + albumgroupObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', albumgroup.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Albumgroup instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Albumgroup
				agent.post('/albumgroups')
					.send(albumgroup)
					.expect(200)
					.end(function(albumgroupSaveErr, albumgroupSaveRes) {
						// Handle Albumgroup save error
						if (albumgroupSaveErr) done(albumgroupSaveErr);

						// Delete existing Albumgroup
						agent.delete('/albumgroups/' + albumgroupSaveRes.body._id)
							.send(albumgroup)
							.expect(200)
							.end(function(albumgroupDeleteErr, albumgroupDeleteRes) {
								// Handle Albumgroup error error
								if (albumgroupDeleteErr) done(albumgroupDeleteErr);

								// Set assertions
								(albumgroupDeleteRes.body._id).should.equal(albumgroupSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Albumgroup instance if not signed in', function(done) {
		// Set Albumgroup user 
		albumgroup.user = user;

		// Create new Albumgroup model instance
		var albumgroupObj = new Albumgroup(albumgroup);

		// Save the Albumgroup
		albumgroupObj.save(function() {
			// Try deleting Albumgroup
			request(app).delete('/albumgroups/' + albumgroupObj._id)
			.expect(401)
			.end(function(albumgroupDeleteErr, albumgroupDeleteRes) {
				// Set message assertion
				(albumgroupDeleteRes.body.message).should.match('User is not logged in');

				// Handle Albumgroup error error
				done(albumgroupDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Albumgroup.remove().exec();
		done();
	});
});