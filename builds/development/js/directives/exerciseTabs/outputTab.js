itPlayApp.directive('outputTab', function() {
	return {
		restrict: 'A',
		templateUrl: 'views/directives/exerciseTabs/outputTab.html',
		controller: 'OutputExercisesTabController'
	}
});