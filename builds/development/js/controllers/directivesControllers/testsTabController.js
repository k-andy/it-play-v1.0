itPlayApp.controller('TestsTabController', function($scope, LessonsFactory, TestsFactory){
	$scope.answers = [{answer: '', correct: false}];

	$scope.addAnswerFieldset = function() {
		$scope.answers.push({answer: '', correct: false});
	};
	
	$scope.removeAnswerFieldset = function() {
		var lastAnswer = $scope.answers.length - 1;
		$scope.answers.splice(lastAnswer);
	};

	$scope.addQuestion = function() {
		var tests = TestsFactory.tests($scope.lesson.$id);

		tests.$add({
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
	
	$scope.updateQuestion = function() {
		var tests = TestsFactory.tests($scope.lesson.$id);

		tests.$add({
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
});