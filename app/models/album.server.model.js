'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Album Schema
 */
var AlbumSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Album name',
		trim: true
	},
	thumbnail: {
		type: String,
		default: '',
		required: 'Please fill Thumbnail name',
		trim: true
	},
	albumgroupid: {
		type: Schema.ObjectId,
		ref: 'Albumgroups'
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Album', AlbumSchema);