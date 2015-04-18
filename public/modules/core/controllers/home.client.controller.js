'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication', 'Albums', 'Albumgroups', 'Pictures',
	function($scope, $animate, Authentication, Albums, Albumgroups, Pictures) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$animate.enabled(false);

		$scope.myInterval = 5000;

		var slides = $scope.slides = [];
		//$scope.addSlide = function() {
		//	var newWidth = slides.length + 1;
		//	slides.push({
		//		image: 'modules/core/img/slider/' + newWidth + '.jpg',
		//		text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
		//		['Gorgeous', 'Cutify', 'Felines', 'Cutes'][slides.length % 4]
		//	});
		//};
		//for (var i=0; i<10; i++) {
		//	$scope.addSlide();
		//}

		slides.push({
					image: 'modules/core/img/photoalbums/Fine Arts/B&W/10452979_10207046983472228_1013604151802666707_o.jpg'
				});
		slides.push({
			image: 'modules/core/img/photoalbums/Fine Arts/B&W/11079581_10207046984472253_5326214675745713581_o.jpg'
		});

		$scope.tabs = Albumgroups.query();
		$scope.albums = Albums.query();
		$scope.slides = Pictures.query();

		//this.forEach(function(item){
		//	console.log(1);
		//});

	}
]);
