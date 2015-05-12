'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

    // Pictures Routes
    app.route('/core')
        .get(core.list);

    app.route('/appSetup/:appSetupName')
        .get(core.getAppSetupValue);

    //app.route('/carousel/:albumId')
    //    .get(core.getCarouselAlbum);

};
