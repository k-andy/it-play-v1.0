itPlayApp.controller('AdminController', function($scope, $http, $firebaseArray, CoursesFactory, CategoriesFactory, 
	LessonsFactory, LessonDetailsFactory, TestsFactory, ROOT_URL){
	$scope.courses = CoursesFactory.courses();

	$scope.courses.$loaded().then(function(data) {
		$scope.course = data[0];
		updateCategoryAndRest();
	});

	$scope.addCourse = function() {
		$scope.courses.$add({
			name: $scope.coursename
		}).then(function(data){
			$scope.coursename = '';
			$scope.course = $scope.courses.$getRecord(data.key());
			updateCategoryAndRest();
		});
	};

	$scope.addCetegory = function() {
		$scope.categories.$add({
			name: $scope.categoryname
		}).then(function(data){
			$scope.categoryname = '';
			$scope.category = $scope.categories.$getRecord(data.key());
			updateLessonAndRest();
		});
	};

	$scope.addLesson = function() {
		$scope.lessons.$add({
			name: $scope.lessonname
		}).then(function(data){
			LessonDetailsFactory.addLessonDetails(data.key(), $scope.newLessonHtmlText);
			$scope.lessonname = '';
			$scope.lesson = $scope.lessons.$getRecord(data.key());
			$scope.updateLessonDetails();
			getLessonHtmlTemplate();
		});
	};

	$scope.updateCetegoriesSelect = function() {
		$scope.categories = CategoriesFactory.categories($scope.course.$id);
		$scope.categories.$loaded().then(function(data) {
			$scope.category = $scope.categories[0];
			if ($scope.category) {
				$scope.lessons = LessonsFactory.lessons($scope.course.$id, $scope.category.$id);

				$scope.lessons.$loaded().then(function(data) {
					$scope.lesson = data[0];
					if ($scope.lesson) {
						$scope.updateLessonDetails();
					};
				});
			} else {
				$scope.lessons = [];
			};
		});
	};

	$scope.updateLessonsSelect = function() {
		$scope.lessons = LessonsFactory.lessons($scope.course.$id, $scope.category.$id);
		$scope.lessons.$loaded().then(function(data) {
			$scope.lesson = data[0];
			if ($scope.lesson) {
				$scope.updateLessonDetails();
			};
		});
	};

	$scope.updateCourse = function() {
		$scope.courses.$save($scope.course).then(function(ref) {
			$scope.courses = CoursesFactory.courses();
			$scope.courses.$loaded().then(function(data) {
				$scope.course = $scope.courses.$getRecord(ref.key());
			});
		});
	};

	$scope.updateCategory = function() {
		$scope.categories.$save($scope.category).then(function(ref) {
			$scope.categories = CategoriesFactory.categories($scope.course.$id);
			$scope.categories.$loaded().then(function(data) {
				$scope.category = $scope.categories.$getRecord(ref.key());
			});
		});
	};

	$scope.updateLesson = function() {
		$scope.lessons.$save($scope.lesson).then(function(ref) {
			$scope.lessons = LessonsFactory.lessons($scope.course.$id, $scope.category.$id);
			$scope.lessons.$loaded().then(function(data) {
				$scope.lesson = $scope.lessons.$getRecord(ref.key());
				$scope.lessonDetails.$save();
			});
		});
	};

	$scope.deleteCourse = function() {
		angular.forEach($scope.categories, function(value, key) {
			angular.forEach(value.lessons, function(value, key) {
				LessonDetailsFactory.deleteHtmlForLesson(key);
			});
		});

		$scope.courses.$remove($scope.course).then(function(ref) {
			$scope.course = $scope.courses[0];
			updateCategoryAndRest();
		});
	};

	$scope.deleteCategory = function() {
		angular.forEach($scope.category.lessons, function(value, key) {
			LessonDetailsFactory.deleteHtmlForLesson(key);
		});
		$scope.categories.$remove($scope.category).then(function(ref) {
			$scope.category = $scope.categories[0];
			updateLessonAndRest();
		});
	};

	$scope.deleteLesson = function() {
		LessonDetailsFactory.deleteHtmlForLesson($scope.lesson.$id);
		$scope.lessons.$remove($scope.lesson).then(function(ref) {
			$scope.lesson = $scope.lessons[0];
			$scope.updateLessonDetails();
		});
	};

	function updateCategoryAndRest(){
		if($scope.course) {
			$scope.categories = CategoriesFactory.categories($scope.course.$id);

			$scope.categories.$loaded().then(function(data) {
				$scope.category = $scope.categories[0];
				updateLessonAndRest();
			});
		} else {
			$scope.category = null;
			$scope.lesson = null;
		}
	};

	function updateLessonAndRest(){
		if($scope.category) {
			$scope.lessons = LessonsFactory.lessons($scope.course.$id, $scope.category.$id);

			$scope.lessons.$loaded().then(function(data) {
				$scope.lesson = data[0];
				if ($scope.lesson) {
					$scope.updateLessonDetails();
				}
				getLessonHtmlTemplate();
			});
		} else {
			$scope.lesson = null;
		}
	};

	$scope.updateLessonDetails = function() {
		if ($scope.lesson) {
			$scope.lessonDetails = LessonDetailsFactory.getLessonDetails($scope.lesson.$id);
			// $scope.questions = [];
			// var questions = TestsFactory.testsForLesson($scope.course.$id, $scope.category.$id, $scope.lesson.$id);
			// questions.$loaded(function(data){
			// 	angular.forEach(questions, function(value, key) {
			// 		var test = TestsFactory.test(value.test);
			// 		test.$loaded(function(ref){
			// 			$scope.questions.push(test);
			// 		});
			// 	});
			// 	$scope.question = $scope.questions[0];
			// });
		} else {
			$scope.lessonDetails = null;
		}
	};

	// $scope.courses.$watch(function(event) {
	// 	$scope.courses.sort(compare);
	// });

	// function compare(a, b) {
	// 	return a.name.localeCompare(b.name);
	// };

	function getLessonHtmlTemplate() {
		$.get( "data/lessonHtmlTemplate.html", function(data) {
			$scope.newLessonHtmlText = data;
		});
	};
});