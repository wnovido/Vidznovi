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
 * List of Album of Pictures for 'Carousel Album'
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
