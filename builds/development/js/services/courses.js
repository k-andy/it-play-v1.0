itPlayApp.factory("CoursesFactory", function($firebaseArray, $firebaseObject, ROOT_URL) {
	return {
		courses : function() {
			var ref = new Firebase(ROOT_URL + 'courses');
			return $firebaseArray(ref);
		},
		course : function(courseId) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId);
			return $firebaseObject(ref);
		}
	};
});