itPlayApp.factory("OutputExercisesFactory", function($firebaseArray, $firebaseObject, LessonsFactory, ROOT_URL) {
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

	return {
		exercise: exercise,
		exercises: exercises,
		exerciseLines : exerciseLines
	}
});