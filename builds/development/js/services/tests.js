itPlayApp.factory("TestsFactory", function($firebaseArray, $firebaseObject, LessonsFactory, ROOT_URL) {
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

	return {
		test: test,
		tests: tests,
		testAnswers : testAnswers
	}
});