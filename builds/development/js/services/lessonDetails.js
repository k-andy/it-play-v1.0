itPlayApp.factory("LessonDetailsFactory", function($firebaseArray, $firebaseObject, ROOT_URL) {
	
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
		getLessonDetails : getLessonDetails,
		addLessonDetails : addLessonDetails,
		deleteHtmlForLesson : deleteHtmlForLesson
	}
});