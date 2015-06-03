itPlayApp.controller('AdminController', function($scope, $http, $firebaseArray, CoursesFactory, CategoriesFactory, LessonsFactory, LessonDetailsFactory, ROOT_URL){
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
		var ref = new Firebase(ROOT_URL + 'lessonDetails');
		$firebaseArray(ref).$add({
			htmlText: $scope.newLessonHtmlText
		}).then(function(data) {
			$scope.lessons.$add({
				name: $scope.lessonname,
				lessonDetails: data.key()
			}).then(function(data){
				$scope.lessonname = '';
				$scope.lesson = $scope.lessons.$getRecord(data.key());
				$scope.updateLessonDetails();
				getLessonHtmlTemplate();
			});
		});
	};

	$scope.updateCetegories = function() {
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

	$scope.updateLessons = function() {
		$scope.lessons = LessonsFactory.lessons($scope.course.$id, $scope.category.$id);
		$scope.lessons.$loaded().then(function(data) {
			$scope.lesson = data[0];
			if ($scope.lesson) {
				$scope.updateLessonDetails();
			};
		});
	};

	$scope.updateCourse = function() {
		$scope.courses.$save($scope.course);
		$scope.courses = CoursesFactory.courses();
		$scope.courses.$watch(function(event) {
			if($scope.course.$id === event.key){
				$scope.course = $scope.courses.$getRecord(event.key);
			}
		});
	};

	$scope.updateCategory = function() {
		$scope.categories.$save($scope.category);
		$scope.categories = CategoriesFactory.categories($scope.course.$id);
		$scope.categories.$watch(function(event) {
			if($scope.category.$id === event.key){
				$scope.category = $scope.categories.$getRecord(event.key);
			}
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
				LessonDetailsFactory.deleteHtmlForLesson(value.lessonDetails);
			});
		});

		$scope.courses.$remove($scope.course).then(function(ref) {
			$scope.course = $scope.courses[0];
			updateCategoryAndRest();
		});
	};

	$scope.deleteCategory = function() {
		angular.forEach($scope.category.lessons, function(value, key) {
			LessonDetailsFactory.deleteHtmlForLesson(value.lessonDetails);
		});
		$scope.categories.$remove($scope.category).then(function(ref) {
			$scope.category = $scope.categories[0];
			updateLessonAndRest();
		});
	};

	$scope.deleteLesson = function() {
		LessonDetailsFactory.deleteHtmlForLesson($scope.lesson.lessonDetails);
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
			$scope.lessonDetails = LessonDetailsFactory.lessonDetails($scope.lesson.lessonDetails);
		} else {
			$scope.lessonDetails = null;
		}
	};

	$scope.courses.$watch(function() {
		$scope.courses.sort(compare);
	});

	function compare(a, b) {
		return a.name.localeCompare(b.name);
	};

	function getLessonHtmlTemplate() {
		$.get( "data/lessonHtmlTemplate.html", function(data) {
			$scope.newLessonHtmlText = data;
		});
	};
});