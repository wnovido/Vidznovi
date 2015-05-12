'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);


    var users = require('../../app/controllers/users.server.controller');

    // Pictures Routes
    app.route('/core')
        .get(core.list)
        .post(users.requiresLogin, core.create);

    app.route('/core/:pictureId')
        .get(core.read)
        .put(users.requiresLogin, core.hasAuthorization, core.update)
        .delete(users.requiresLogin, core.hasAuthorization, core.delete);

    // Finish by binding the Picture middleware
    app.param('pictureId', core.pictureByID);

    //app.route('/appSetup/:appSetupName')
    //    .get(core.getAppSetupValue);
    //
    //app.route('/carousel/:albumId')
    //    .get(core.getCarouselAlbum);

};
