'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * App setup Schema
 */
var AppSetupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill App setup name',
		trim: true
	},
	value: {
		type: String,
		default: '',
		required: 'Please fill App setup value',
		trim: true
	},
	description: {
		type: String,
		default: '',
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

mongoose.model('AppSetup', AppSetupSchema);
