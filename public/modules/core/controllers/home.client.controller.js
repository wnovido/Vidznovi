'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication',
	function($scope, $animate, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$animate.enabled(false);

		$scope.myInterval = 5000;
		var slides = $scope.slides = [];
		$scope.addSlide = function() {
			var newWidth = slides.length + 1;
			slides.push({
				image: 'modules/core/img/slider/' + newWidth + '.jpg',
				text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
				['Gorgeous', 'Cutify', 'Felines', 'Cutes'][slides.length % 4]
			});
		};
		for (var i=0; i<10; i++) {
			$scope.addSlide();
		}

		$scope.tabs = [
			{ title:'Portraits', content:'Album 1', showFlag: 1 },
			{ title:'Real Estate', content:'Album 2', showFlag: 0 },
			{ title:'Fine Arts', content:'Album 3', showFlag: 1 },
			{ title:'Events', content:'Album 4', showFlag: 0 },
			{ title:'Sports', content:'Album 5', showFlag: 1 }
		];

	}
]);
