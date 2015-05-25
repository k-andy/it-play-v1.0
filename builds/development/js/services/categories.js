itPlayApp.factory("CategoriesFactory", function($firebaseObject, $firebaseArray, ROOT_URL) {
	return {
		categories : function(courseId) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories');
			return $firebaseArray(ref);
		},
		category : function(courseId, categoryId) {
			var ref = new Firebase(ROOT_URL + 'courses/' + courseId + '/categories/' + categoryId);
			return $firebaseObject(ref);
		}
	};
});