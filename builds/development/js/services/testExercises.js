itPlayApp.factory("LessonsFactory", function($firebaseArray, $firebaseObject, ROOT_URL) {
	return {
		lessons : function(courseId, categoryId) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons');
			return $firebaseArray(ref);
		},
		lesson : function(courseId, categoryId, lessonId) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons/'+ lessonId);
			return $firebaseObject(ref);
		}, 
		updateLessonName : function(courseId, categoryId, lessonId, newValue) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons/'+ lessonId);
			ref.child('/name').set(newValue);
		}
	};
});