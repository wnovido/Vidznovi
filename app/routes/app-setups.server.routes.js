'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var appSetups = require('../../app/controllers/app-setups.server.controller');

	// App setups Routes
	app.route('/app-setups')
		.get(appSetups.list)
		.post(users.requiresLogin, appSetups.create);

	app.route('/app-setups/:appSetupId')
		.get(appSetups.read)
		.put(users.requiresLogin, appSetups.hasAuthorization, appSetups.update)
		.delete(users.requiresLogin, appSetups.hasAuthorization, appSetups.delete);

	// Finish by binding the App setup middleware
	app.param('appSetupId', appSetups.appSetupByID);
};
