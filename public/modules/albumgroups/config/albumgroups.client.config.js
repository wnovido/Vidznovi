'use strict';

// Configuring the Articles module
angular.module('albumgroups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Albumgroups', 'albumgroups', 'dropdown', '/albumgroups(/create)?');
		Menus.addSubMenuItem('topbar', 'albumgroups', 'List Albumgroups', 'albumgroups');
		Menus.addSubMenuItem('topbar', 'albumgroups', 'New Albumgroup', 'albumgroups/create');
	}
]);