'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	AppSetup = mongoose.model('AppSetup');

/**
 * Globals
 */
var user, appSetup;

/**
 * Unit tests
 */
describe('App setup Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			appSetup = new AppSetup({
				name: 'App setup Name',
				description: 'App setup Description',
				value: 'App setup Value',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return appSetup.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			appSetup.name = '';

			return appSetup.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without value', function(done) {
			appSetup.value = '';

			return appSetup.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		AppSetup.remove().exec();
		User.remove().exec();

		done();
	});
});
