'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Picture = mongoose.model('Picture'),
    AppSetup = mongoose.model('AppSetup'),
    _ = require('lodash');

exports.index = function(req, res) {
    res.render('index', {
        user: req.user || null,
        request: req
    });
};



/**
 * List of Pictures
 */
exports.list = function(req, res) {
    AppSetup.findOne().where('name').equals('Carousel Album').sort('-created').populate('user', 'displayName').exec(function(err, appSetup) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            Picture.find().where('album').equals(appSetup.value).sort('-created').populate('user', 'displayName').populate('album').exec(function(err, pictures) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(pictures);
                }
            });
        }
    });


};


/*
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    AppSetup = mongoose.model('AppSetup'),
    CarouselAlbum = mongoose.model('Picture'),
    _ = require('lodash');

exports.getAppSetupValue = function(req, res) {
    AppSetup.findOne().where('name').equals(req.params.appSetupName).sort('-created').populate('user', 'displayName').exec(function(err, appSetup) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(appSetup);
        }
    });
};

exports.getCarouselAlbum = function(req, res) {
    CarouselAlbum.find().sort('-created').populate('user', 'displayName').exec(function(err, carouselAlbum) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(carouselAlbum);
        }
    });
};
*/













/**
 * Create a Picture
 */
exports.create = function(req, res) {
    var picture = new Picture(req.body);
    picture.user = req.user;

    picture.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(picture);
        }
    });
};

/**
 * Show the current Picture
 */
exports.read = function(req, res) {
    res.jsonp(req.picture);
};

/**
 * Update a Picture
 */
exports.update = function(req, res) {
    var picture = req.picture ;

    picture = _.extend(picture , req.body);

    picture.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(picture);
        }
    });
};

/**
 * Delete an Picture
 */
exports.delete = function(req, res) {
    var picture = req.picture ;

    picture.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(picture);
        }
    });
};

/**
 * Picture middleware
 */
exports.pictureByID = function(req, res, next, id) {
    Picture.findById(id).populate('user', 'displayName').exec(function(err, picture) {
        if (err) return next(err);
        if (! picture) return next(new Error('Failed to load Picture ' + id));
        req.picture = picture ;
        next();
    });
};

/**
 * Picture authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.picture.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};

