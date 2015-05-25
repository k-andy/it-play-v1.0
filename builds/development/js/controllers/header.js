itPlayApp.controller('HeaderController', function($scope, CoursesFactory){
	$scope.courses = CoursesFactory.courses();
});