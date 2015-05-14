'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Albumgroup = mongoose.model('Albumgroup'),
    fs = require('fs'),
	_ = require('lodash');

/**
 * Create a Albumgroup
 */
exports.create = function(req, res) {
	var albumgroup = new Albumgroup(req.body);
	albumgroup.user = req.user;

    /* This can be global and I think it needs to be in the server */
	var dir = 'public/modules/core/img/photoalbums/' + albumgroup.name;
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

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
    var dirFrom = 'public/modules/core/img/photoalbums/' + albumgroup.name;

    albumgroup = _.extend(albumgroup , req.body);
    var dirTo = 'public/modules/core/img/photoalbums/' + albumgroup.name;

    fs.rename(dirFrom, dirTo, function (err) {
        if (err) throw err;
        fs.stat(dirTo, function (err, stats) {
            if (err) throw err;
            console.log('stats: ' + JSON.stringify(stats));
        });
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
    var dir = 'public/modules/core/img/photoalbums/' + albumgroup.name;
    if (fs.existsSync(dir)){
        fs.rmdirSync(dir);
    }

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
