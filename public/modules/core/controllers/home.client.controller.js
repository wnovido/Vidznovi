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
			{ tab_id:1, title:'Portraits', showFlag: 1 },
			{ tab_id:2, title:'Real Estate', showFlag: 1 },
			{ tab_id:3, title:'Fine Arts', showFlag: 1 },
			{ tab_id:4, title:'Events', showFlag: 1 },
			{ tab_id:5, title:'Sports', showFlag: 1 }
		];

		$scope.albums = [
			{ album_id: 1, title:'His', tab_id:1, showFlag: 1 },
			{ album_id: 2, title:'Hers', tab_id:1, showFlag: 0 },
			{ album_id: 3, title:'Anything', tab_id:3, showFlag: 0 },
			{ album_id: 5, title:'Under The Sun', tab_id:5, showFlag: 0 }
		];




	}
]);
