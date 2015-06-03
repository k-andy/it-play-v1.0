itPlayApp.directive('exerciseTabs', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/exerciseTabs.html',
		link: function(scope, el, attrs){
			scope.tab = 'tests';
		}
	};
});