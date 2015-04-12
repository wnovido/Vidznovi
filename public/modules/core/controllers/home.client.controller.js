'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication', 'Albums',
	function($scope, $animate, Authentication, Albums) {
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
			{ tab_id:111, name:'Portraits', showFlag: 1 },
			{ tab_id:222, name:'Real Estate', showFlag: 1 },
			{ tab_id:333, name:'Fine Arts', showFlag: 1 },
			{ tab_id:444, name:'Events', showFlag: 1 },
			{ tab_id:555, name:'Sports', showFlag: 1 }
		];

		$scope.albums = [
			{ album_id: 1, name:'His', tab_id:111, showFlag: 1, thumbnail: 1 },
			{ album_id: 2, name:'Hers', tab_id:111, showFlag: 0, thumbnail: 3 },
			{ album_id: 3, name:'Interiors', tab_id:222, showFlag: 0, thumbnail: 5 },
			{ album_id: 4, name:'Exteriors', tab_id:222, showFlag: 0, thumbnail: 7 },
			{ album_id: 5, name:'Flowers', tab_id:333, showFlag: 0, thumbnail: 9 },
			{ album_id: 6, name:'Birds', tab_id:333, showFlag: 0, thumbnail: 11 },
			{ album_id: 7, name:'Landscape', tab_id:333, showFlag: 0, thumbnail: 13 },
			{ album_id: 8, name:'Weddings', tab_id:444, showFlag: 0, thumbnail: 15 },
			{ album_id: 9, name:'Proms', tab_id:444, showFlag: 0, thumbnail: 17 },
			{ album_id: 10, name:'Birthdays', tab_id:444, showFlag: 0, thumbnail: 19 },
			{ album_id: 11, name:'Basketball', tab_id:555, showFlag: 0, thumbnail: 20 }
		];

		// Find a list of Albums
	//	$scope.find = function() {
	//		$scope.albums = Albums.query();
	//	};



	}
]);
