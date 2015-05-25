itPlayApp.factory("LessonsFactory", ["$firebaseArray", 'ROOT_URL', function($firebaseArray, ROOT_URL) {
	return {
		lessons : function(courseId, categoryId) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons');
			return $firebaseArray(ref);
		},
		lesson : function(courseId, categoryId, lessonId) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId + '/lessons/'+ lessonId);
			return $firebaseObject(ref);
		}
	};
}]);