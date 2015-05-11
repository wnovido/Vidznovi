'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	AppSetup = mongoose.model('AppSetup'),
	_ = require('lodash');

/**
 * Create a App setup
 */
exports.create = function(req, res) {
	var appSetup = new AppSetup(req.body);
	appSetup.user = req.user;

	appSetup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appSetup);
		}
	});
};

/**
 * Show the current App setup
 */
exports.read = function(req, res) {
	res.jsonp(req.appSetup);
};

/**
 * Update a App setup
 */
exports.update = function(req, res) {
	var appSetup = req.appSetup ;

	appSetup = _.extend(appSetup , req.body);

	appSetup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appSetup);
		}
	});
};

/**
 * Delete an App setup
 */
exports.delete = function(req, res) {
	var appSetup = req.appSetup ;

	appSetup.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appSetup);
		}
	});
};

/**
 * List of App setups
 */
exports.list = function(req, res) { 
	AppSetup.find().sort('-created').populate('user', 'displayName').exec(function(err, appSetups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appSetups);
		}
	});
};

/**
 * App setup middleware
 */
exports.appSetupByID = function(req, res, next, id) { 
	AppSetup.findById(id).populate('user', 'displayName').exec(function(err, appSetup) {
		if (err) return next(err);
		if (! appSetup) return next(new Error('Failed to load App setup ' + id));
		req.appSetup = appSetup ;
		next();
	});
};

/**
 * App setup authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.appSetup.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
