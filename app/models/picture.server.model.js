'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Picture Schema
 */
var PictureSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Picture name',
		trim: true
	},
	filename: {
		type: String,
		default: '',
		required: 'Please fill Picture filename',
		trim: true
	},
	album: {
		type: Schema.ObjectId,
		ref: 'Album'
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

mongoose.model('Picture', PictureSchema);
