itPlayApp.controller('LessonController', function($scope, $routeParams, LessonsFactory){
	LessonsFactory.lesson($routeParams.courseId, $routeParams.categoryId, $routeParams.lessonId).$bindTo($scope, 'lesson');
});