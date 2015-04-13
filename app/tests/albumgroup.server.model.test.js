'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Albumgroup = mongoose.model('Albumgroup');

/**
 * Globals
 */
var user, albumgroup;

/**
 * Unit tests
 */
describe('Albumgroup Model Unit Tests:', function() {
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
			albumgroup = new Albumgroup({
				name: 'Albumgroup Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return albumgroup.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			albumgroup.name = '';

			return albumgroup.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Albumgroup.remove().exec();
		User.remove().exec();

		done();
	});
});