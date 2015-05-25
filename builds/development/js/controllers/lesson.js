itPlayApp.controller('LessonController', function($scope, $firebaseObject, $routeParams, LessonsFactory){
	LessonsFactory.lesson($routeParams.courseId, $routeParams.categoryId, $routeParams.lessonId).$bindTo($scope, 'lesson');

	$scope.showHideLessons = function(courseId, categoryId) {
		if (!$scope.lessons) {
			$scope.lessons = LessonsFactory.lessons(courseId, categoryId);
		} else {
			$scope.lessons = null;
		}
	};
});