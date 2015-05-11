'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	AppSetup = mongoose.model('AppSetup'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, appSetup;

/**
 * App setup routes tests
 */
describe('App setup CRUD tests', function() {
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

		// Save a user to the test db and create new App setup
		user.save(function() {
			appSetup = {
				name: 'App setup Name'
			};

			done();
		});
	});

	it('should be able to save App setup instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new App setup
				agent.post('/app-setups')
					.send(appSetup)
					.expect(200)
					.end(function(appSetupSaveErr, appSetupSaveRes) {
						// Handle App setup save error
						if (appSetupSaveErr) done(appSetupSaveErr);

						// Get a list of App setups
						agent.get('/app-setups')
							.end(function(appSetupsGetErr, appSetupsGetRes) {
								// Handle App setup save error
								if (appSetupsGetErr) done(appSetupsGetErr);

								// Get App setups list
								var appSetups = appSetupsGetRes.body;

								// Set assertions
								(appSetups[0].user._id).should.equal(userId);
								(appSetups[0].name).should.match('App setup Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save App setup instance if not logged in', function(done) {
		agent.post('/app-setups')
			.send(appSetup)
			.expect(401)
			.end(function(appSetupSaveErr, appSetupSaveRes) {
				// Call the assertion callback
				done(appSetupSaveErr);
			});
	});

	it('should not be able to save App setup instance if no name is provided', function(done) {
		// Invalidate name field
		appSetup.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new App setup
				agent.post('/app-setups')
					.send(appSetup)
					.expect(400)
					.end(function(appSetupSaveErr, appSetupSaveRes) {
						// Set message assertion
						(appSetupSaveRes.body.message).should.match('Please fill App setup name');
						
						// Handle App setup save error
						done(appSetupSaveErr);
					});
			});
	});

	it('should be able to update App setup instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new App setup
				agent.post('/app-setups')
					.send(appSetup)
					.expect(200)
					.end(function(appSetupSaveErr, appSetupSaveRes) {
						// Handle App setup save error
						if (appSetupSaveErr) done(appSetupSaveErr);

						// Update App setup name
						appSetup.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing App setup
						agent.put('/app-setups/' + appSetupSaveRes.body._id)
							.send(appSetup)
							.expect(200)
							.end(function(appSetupUpdateErr, appSetupUpdateRes) {
								// Handle App setup update error
								if (appSetupUpdateErr) done(appSetupUpdateErr);

								// Set assertions
								(appSetupUpdateRes.body._id).should.equal(appSetupSaveRes.body._id);
								(appSetupUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of App setups if not signed in', function(done) {
		// Create new App setup model instance
		var appSetupObj = new AppSetup(appSetup);

		// Save the App setup
		appSetupObj.save(function() {
			// Request App setups
			request(app).get('/app-setups')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single App setup if not signed in', function(done) {
		// Create new App setup model instance
		var appSetupObj = new AppSetup(appSetup);

		// Save the App setup
		appSetupObj.save(function() {
			request(app).get('/app-setups/' + appSetupObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', appSetup.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete App setup instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new App setup
				agent.post('/app-setups')
					.send(appSetup)
					.expect(200)
					.end(function(appSetupSaveErr, appSetupSaveRes) {
						// Handle App setup save error
						if (appSetupSaveErr) done(appSetupSaveErr);

						// Delete existing App setup
						agent.delete('/app-setups/' + appSetupSaveRes.body._id)
							.send(appSetup)
							.expect(200)
							.end(function(appSetupDeleteErr, appSetupDeleteRes) {
								// Handle App setup error error
								if (appSetupDeleteErr) done(appSetupDeleteErr);

								// Set assertions
								(appSetupDeleteRes.body._id).should.equal(appSetupSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete App setup instance if not signed in', function(done) {
		// Set App setup user 
		appSetup.user = user;

		// Create new App setup model instance
		var appSetupObj = new AppSetup(appSetup);

		// Save the App setup
		appSetupObj.save(function() {
			// Try deleting App setup
			request(app).delete('/app-setups/' + appSetupObj._id)
			.expect(401)
			.end(function(appSetupDeleteErr, appSetupDeleteRes) {
				// Set message assertion
				(appSetupDeleteRes.body.message).should.match('User is not logged in');

				// Handle App setup error error
				done(appSetupDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		AppSetup.remove().exec();
		done();
	});
});