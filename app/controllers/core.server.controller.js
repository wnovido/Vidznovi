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

