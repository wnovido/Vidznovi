'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Albumgroup Schema
 */
var AlbumgroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Albumgroup name',
		trim: true
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

mongoose.model('Albumgroup', AlbumgroupSchema);