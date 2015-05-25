itPlayApp.controller('CategoryContentController', function($scope, $firebaseObject, $routeParams, CategoriesFactory){
	CategoriesFactory.category($routeParams.courseId, $routeParams.categoryId).$bindTo($scope, 'category');
	$scope.courseId = $routeParams.courseId;
});