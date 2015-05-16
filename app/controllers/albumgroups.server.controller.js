'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Albumgroup = mongoose.model('Albumgroup'),
    fs = require('fs'),
	albumLib = require('./main-album-library.server.controller.js'),
	_ = require('lodash');

/**
 * Create a Albumgroup
 */
exports.create = function(req, res) {
	var albumgroup = new Albumgroup(req.body);
	albumgroup.user = req.user;

    /* This can be global and I think it needs to be in the server */
    var dir = albumLib.mainDirectoryAlbum() + albumgroup.name;
    fs.mkdir(dir, function (err) {
        if (err) console.error(err);
        else console.log(dir + ' created!');
    });

	albumgroup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(albumgroup);
		}
	});


};

/**
 * Show the current Albumgroup
 */
exports.read = function(req, res) {
	res.jsonp(req.albumgroup);
};

/**
 * Update a Albumgroup
 */
exports.update = function(req, res) {
	var albumgroup = req.albumgroup ;
    var dirFrom = albumLib.mainDirectoryAlbum() + albumgroup.name;

    albumgroup = _.extend(albumgroup , req.body);
    var dirTo = albumLib.mainDirectoryAlbum() + albumgroup.name;

	fs.rename(dirFrom, dirTo, function (err) {
		if (err) console.error(err);
		else console.log(dirFrom + ' renamed ' + dirTo + '!');
	});

	albumgroup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(albumgroup);
		}
	});
};

/**
 * Delete an Albumgroup
 */
exports.delete = function(req, res) {
	var albumgroup = req.albumgroup ;

    /* This can be global and I think it needs to be in the server */

    var dir = albumLib.mainDirectoryAlbum() + albumgroup.name;
    fs.rmdir(dir, function (err) {
        if (err) console.error(err);
        else console.log(dir + ' deleted!');
    });

    albumgroup.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(albumgroup);
		}
	});
};

/**
 * List of Albumgroups
 */
exports.list = function(req, res) { 
	Albumgroup.find().sort('-created').populate('user', 'displayName').exec(function(err, albumgroups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(albumgroups);
		}
	});
};

/**
 * Albumgroup middleware
 */
exports.albumgroupByID = function(req, res, next, id) { 
	Albumgroup.findById(id).populate('user', 'displayName').exec(function(err, albumgroup) {
		if (err) return next(err);
		if (! albumgroup) return next(new Error('Failed to load Albumgroup ' + id));
		req.albumgroup = albumgroup ;
		next();
	});
};

/**
 * Albumgroup authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.albumgroup.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
