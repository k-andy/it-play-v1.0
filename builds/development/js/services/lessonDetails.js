itPlayApp.factory("LessonDetailsFactory", function($firebaseArray, $firebaseObject, ROOT_URL) {
	return {
		lessondetails : function() {
			var ref = new Firebase(ROOT_URL + 'lessondetails');
			return $firebaseArray(ref);
		},
		getHtmlForLesson : function(lessonDetailsId) {
			var ref = new Firebase(ROOT_URL + 'lessondetails/' + lessonDetailsId);
			return $firebaseObject(ref);
		}
	};
});