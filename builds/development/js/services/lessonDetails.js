itPlayApp.factory("LessonDetailsFactory", function($firebaseArray, $firebaseObject, ROOT_URL) {
	return {
		lessonDetails : function(lessonDetailId) {
			var ref = new Firebase(ROOT_URL + 'lessonDetails/' + lessonDetailId);
			return $firebaseObject(ref);
		},
		deleteHtmlForLesson : function(lessonDetailsId) {
			var ref = new Firebase(ROOT_URL + 'lessonDetails/' + lessonDetailsId);
			$firebaseObject(ref).$remove()
		}
	};
});