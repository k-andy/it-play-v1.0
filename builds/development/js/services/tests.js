itPlayApp.factory("TestsFactory", function($firebaseArray, $firebaseObject, LessonsFactory, ROOT_URL) {
	function test(lessonId, testId) {
		var ref = new Firebase(ROOT_URL + 'tests/lesson' + lessonId + '/' + testId);
		return $firebaseObject(ref);
	};

	function tests(lessonId) {
		var ref = new Firebase(ROOT_URL + 'tests/lesson' + lessonId);
		return $firebaseArray(ref);
	};

	function testAnswers(lessonId, testId) {
		var ref = new Firebase(ROOT_URL + 'tests/lesson' + lessonId + '/' + testId);
		return $firebaseArray(ref);
	};

	function addTests(lessonId) {
		var ref = new Firebase(ROOT_URL + 'tests/lesson' + lessonId);
		$firebaseArray(ref).$add({
			question: $scope.question
		}).then(function(data){
			var answers = TestsFactory.testAnswers($scope.lesson.$id, data.key());
			angular.forEach($scope.answers, function(value, key) {
				answers.$add({
					answer: value.answer,
					correct: value.correct
				});
			});
		});
	};

	return {
		test: test,
		tests: tests,
		testAnswers : testAnswers,
		addTests : addTests
	}
});