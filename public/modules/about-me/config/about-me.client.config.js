'use strict';

// Configuring the Articles module
angular.module('about-me').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'About Me', 'about-me', 'item', '/about-me');
	}
]);
