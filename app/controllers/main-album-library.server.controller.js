'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Albumgroup = mongoose.model('Albumgroup'),
    _ = require('lodash');

/**
 * Create a Main album library
 */
exports.create = function(req, res) {

};

/**
 * Show the current Main album library
 */
exports.read = function(req, res) {

};

/**
 * Update a Main album library
 */
exports.update = function(req, res) {

};

/**
 * Delete an Main album library
 */
exports.delete = function(req, res) {

};

/**
 * List of Main album libraries
 */
exports.list = function(req, res) {

};

exports.albumGroupName = function (req, res, albumGroupId) {
    var albumGroupName;

    Albumgroup.findOne().where('_id').equals(albumGroupId).exec(function (err, albumGroup) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            //console.log('inside albumgroup name: ' + albumGroup.name);
            albumGroupName = albumGroup.name;
            console.log(albumGroupName);
        }
    });

    setInterval(function() {console.log(albumGroupName);}, 5000);
    return albumGroupName;

};

exports.mainDirectoryAlbum = function() {
    return 'public/modules/core/img/photoalbums/';
};



