itPlayApp.controller('CourseContentController', function($scope, $firebaseObject, $routeParams, CoursesFactory, LessonsFactory){
	CoursesFactory.course($routeParams.courseId).$bindTo($scope, 'course');
});