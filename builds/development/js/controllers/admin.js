itPlayApp.controller('AdminController', function($scope, $http, CoursesFactory, CategoriesFactory, LessonsFactory, LessonDetailsFactory, ROOT_URL){
	$scope.courses = CoursesFactory.courses();
	getLessonHtmlTemplate();

	$scope.courses.$loaded().then(function(data) {
		$scope.course = data[0];
		if($scope.course) {
			$scope.categories = CategoriesFactory.categories(data[0].$id);
			
			$scope.categories.$loaded().then(function(data) {
				$scope.category = $scope.categories[0];
				if($scope.category) {
					$scope.lessons = LessonsFactory.lessons($scope.course.$id, $scope.category.$id);

					$scope.lessons.$loaded().then(function(data) {
						$scope.lesson = data[0];
						if ($scope.lesson) {
							$scope.updateLessonDetails();
						};
					});
				};
			});
		};
	});

	$scope.addCourse = function() {
		$scope.courses.$add({
			name: $scope.coursename
		}).then(function(data){
			$scope.coursename = '';
			$scope.course = $scope.courses.$getRecord(data.key());
			$scope.categories = CategoriesFactory.categories(data.key());

			$scope.categories.$loaded().then(function(data) {
				$scope.category = $scope.categories[0];
			});
		});
	};

	$scope.addCetegory = function() {
		$scope.categories.$add({
			name: $scope.categoryname
		}).then(function(data){
			$scope.categoryname = '';
			$scope.category = $scope.categories.$getRecord(data.key());
			$scope.lessons = LessonsFactory.lessons($scope.course.$id, data.key());

			$scope.lessons.$loaded().then(function(data) {
				$scope.lesson = data[0];
				if ($scope.lesson) {
					$scope.updateLessonDetails();
				};
			});
		});
	};

	$scope.addLesson = function() {
		$scope.lessonDetails = LessonDetailsFactory.lessondetails();
		$scope.lessonDetails.$add({
			htmlText: $scope.lessonHtmlText
		}).then(function(data){
			$scope.lessons.$add({
				name: $scope.lessonname,
				lessonDetails: data.key()
			}).then(function(data){
				$scope.lessonname = '';
				$scope.lesson = $scope.lessons.$getRecord(data.key());
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

	$scope.updateLessonDetails = function() {
		LessonDetailsFactory.getHtmlForLesson($scope.lesson.lessonDetails).$bindTo($scope, 'lessonHtml');
	};

	$scope.updateLesson = function() {
		$scope.lessons.$save($scope.lessons.$indexFor($scope.lesson.$id));
		$scope.lessons = LessonsFactory.lessons($scope.course.$id, $scope.category.$id);
		$scope.lessons.$watch(function(event) {
			$scope.lesson = $scope.lessons.$getRecord(event.key);
		});
	};

	$scope.courses.$watch(function() {
		$scope.courses.sort(compare);
	});

	function compare(a, b) {
		return a.name.localeCompare(b.name);
	};

	function getLessonHtmlTemplate() {
		$.get( "data/lessonHtmlTemplate.html", function( data ) {
			$scope.lessonHtmlText = data;
		});
	};
});