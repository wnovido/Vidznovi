'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var albumgroups = require('../../app/controllers/albumgroups.server.controller');

	// Albumgroups Routes
	app.route('/albumgroups')
		.get(albumgroups.list)
		.post(users.requiresLogin, albumgroups.create);

	app.route('/albumgroups/:albumgroupId')
		.get(albumgroups.read)
		.put(users.requiresLogin, albumgroups.hasAuthorization, albumgroups.update)
		.delete(users.requiresLogin, albumgroups.hasAuthorization, albumgroups.delete);

	// Finish by binding the Albumgroup middleware
	app.param('albumgroupId', albumgroups.albumgroupByID);
};
