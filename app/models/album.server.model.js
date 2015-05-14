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
		trim: true
	},
	albumgroup: {
		type: Schema.ObjectId,
		ref: 'Albumgroup'
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
