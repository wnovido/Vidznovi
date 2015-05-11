'use strict';

// Configuring the Articles module
angular.module('app-setups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'App setups', 'app-setups', 'dropdown', '/app-setups(/create)?');
		Menus.addSubMenuItem('topbar', 'app-setups', 'List App setups', 'app-setups');
		Menus.addSubMenuItem('topbar', 'app-setups', 'New App setup', 'app-setups/create');
	}
]);