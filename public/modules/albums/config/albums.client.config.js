'use strict';

// Configuring the Articles module
angular.module('albums').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Albums', 'albums', 'dropdown', '/albums(/create)?');
		Menus.addSubMenuItem('topbar', 'albums', 'List Albums', 'albums');
		Menus.addSubMenuItem('topbar', 'albums', 'New Album', 'albums/create');
		//Menus.addMenuItem('topbar', 'About Me', 'aboutme', 'item', '/aboutme');
	}
]);
