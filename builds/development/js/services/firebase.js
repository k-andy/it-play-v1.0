itPlayApp.factory("FirebaseFactory", function($firebaseObject, $firebaseArray, ROOT_URL) {
	function categories(courseId) {
		var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories');
		return $firebaseArray(ref);
	};

	function category(courseId, categoryId) {
		var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId);
		return $firebaseObject(ref);
	};
	
	function courses() {
		var ref = new Firebase(ROOT_URL + 'courses');
		return $firebaseArray(ref);
	};

	function course(courseId) {
		var ref = new Firebase(ROOT_URL + 'courses/' + courseId);
		return $firebaseObject(ref);
	};

	function lessons(courseId, categoryId) {
		var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons');
		return $firebaseArray(ref);
	};

	function lessonTests(courseId, categoryId, lessonId) {
		var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons/' + lessonId +
			'/tests');
		return $firebaseArray(ref);
	};

	function lesson(courseId, categoryId, lessonId) {
		var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons/' + lessonId);
		return $firebaseObject(ref);
	};

	function updateLessonName(courseId, categoryId, lessonId, newValue) {
		var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons/' + lessonId);
		ref.child('/name').set(newValue);
	},


	function exercise(lessonId, exerciseId) {
		var ref = new Firebase(ROOT_URL + 'outputExercises/lesson' + lessonId + '/' + exerciseId);
		return $firebaseObject(ref);
	};

	function exercises(lessonId) {
		var ref = new Firebase(ROOT_URL + 'outputExercises/lesson' + lessonId);
		return $firebaseArray(ref);
	};

	function exerciseLines(lessonId, exerciseId) {
		var ref = new Firebase(ROOT_URL + 'outputExercises/lesson' + lessonId + '/' + exerciseId + '/outputLines');
		return $firebaseArray(ref);
	};

	function test(lessonId, questionId) {
		var ref = new Firebase(ROOT_URL + 'tests/lesson' + lessonId + '/' + questionId);
		return $firebaseObject(ref);
	};

	function tests(lessonId) {
		var ref = new Firebase(ROOT_URL + 'tests/lesson' + lessonId);
		return $firebaseArray(ref);
	};

	function testAnswers(lessonId, questionId) {
		var ref = new Firebase(ROOT_URL + 'tests/lesson' + lessonId + '/' + questionId + '/answers');
		return $firebaseArray(ref);
	};


	function getLessonDetails(lessonId) {
		var ref = new Firebase(ROOT_URL + 'lessonDetails/lesson' + lessonId);
		return $firebaseObject(ref);
	};

	function addLessonDetails(lessonId, value) {
		var lessonDetails = getLessonDetails(lessonId);
		lessonDetails.htmlText = value;
		lessonDetails.$save();
	};

	function deleteHtmlForLesson(lessonId) {
		var ref = new Firebase(ROOT_URL + 'lessonDetails/lesson' + lessonId);
		$firebaseObject(ref).$remove()
	};

	return {
		categories: categories,
		category : category,
		courses: courses,
		course: course,
		lessons: lessons,
		lessonTests: lessonTests,
		lesson: lesson,
		updateLessonName,
		exercise: exercise,
		exercises: exercises,
		exerciseLines : exerciseLines,
		test: test,
		tests: tests,
		testAnswers : testAnswers,
		getLessonDetails : getLessonDetails,
		addLessonDetails : addLessonDetails,
		deleteHtmlForLesson : deleteHtmlForLesson
	}
});