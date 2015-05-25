var itPlayApp = angular.module('itPlayApp', ['ngRoute', 'firebase'])
.constant('ROOT_URL', 'https://it-paly-v1.firebaseio.com/');

itPlayApp.filter('html', ['$sce', function ($sce) { 
	return function (text) {
		return $sce.trustAsHtml(text);
	};    
}]);

itPlayApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/', {
		templateUrl : 'views/home.html'
	}).
	when('/admin', {
		templateUrl : 'views/admin.html',
		controller: 'AdminController'
	}).
	when('/course/:courseId', {
		templateUrl : 'views/courseContent.html',
		controller : 'CourseContentController'
	}).
	when('/category/:courseId/:categoryId', {
		templateUrl : 'views/categoryContent.html',
		controller : 'CategoryContentController'
	}).
	when('/lesson/:courseId/:categoryId/:lessonId', {
		templateUrl : 'views/lesson.html',
		controller : 'LessonController'
	}).
	when('/contacts', {
		templateUrl : 'views/contacts.html'
	});
}]);