'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Album = mongoose.model('Album'),
	_ = require('lodash');

/**
 * Create a Album
 */
exports.create = function(req, res) {
	var album = new Album(req.body);
	album.user = req.user;

	album.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(album);
		}
	});
};

/**
 * Show the current Album
 */
exports.read = function(req, res) {
	res.jsonp(req.album);
};

/**
 * Update a Album
 */
exports.update = function(req, res) {
	var album = req.album ;

	album = _.extend(album , req.body);

	album.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(album);
		}
	});
};

/**
 * Delete an Album
 */
exports.delete = function(req, res) {
	var album = req.album ;

	album.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(album);
		}
	});
};

/**
 * List of Albums
 */
exports.list = function(req, res) { 
	Album.find().sort('-created').populate('user', 'displayName').exec(function(err, albums) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(albums);
		}
	});
};

/**
 * Album middleware
 */
exports.albumByID = function(req, res, next, id) { 
	Album.findById(id).populate('user', 'displayName').exec(function(err, album) {
		if (err) return next(err);
		if (! album) return next(new Error('Failed to load Album ' + id));
		req.album = album ;
		next();
	});
};

/**
 * Album authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.album.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
