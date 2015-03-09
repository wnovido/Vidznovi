'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var albums = require('../../app/controllers/albums.server.controller');

	// Albums Routes
	app.route('/albums')
		.get(albums.list)
		.post(users.requiresLogin, albums.create);

	app.route('/albums/:albumId')
		.get(albums.read)
		.put(users.requiresLogin, albums.hasAuthorization, albums.update)
		.delete(users.requiresLogin, albums.hasAuthorization, albums.delete);

	// Finish by binding the Album middleware
	app.param('albumId', albums.albumByID);
};
