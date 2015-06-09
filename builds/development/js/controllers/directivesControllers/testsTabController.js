itPlayApp.controller('TestsTabController', function($scope, LessonsFactory, TestsFactory){
	$scope.answers = [{answer: '', correct: false}];
	$scope.$on('lesson_set', function(event) {
		$scope.questions = TestsFactory.tests($scope.lesson.$id);
		$scope.questions.$loaded(function(data){
			$scope.question = $scope.questions[0];
			if ($scope.question) {
				$scope.updateQuestionsSelect();
			}
		});
	});

	$scope.addAnswerFieldset = function() {
		$scope.answers.push({answer: '', correct: false});
	};
	
	$scope.removeAnswerFieldset = function() {
		var lastAnswer = $scope.answers.length - 1;
		$scope.answers.splice(lastAnswer);
	};

	$scope.addQuestion = function() {
		TestsFactory.tests($scope.lesson.$id).$add({
			questionText: $scope.questionText,
			answers: $scope.answers
		}).then(function(data){
			var key = data.key();
			$scope.questions = TestsFactory.tests($scope.lesson.$id);
			$scope.questions.$loaded(function(data) {
				$scope.question = $scope.questions.$getRecord(key);
				$scope.updateQuestionsSelect();
			});
		});
	};
	
	$scope.deleteQuestion = function() {
		$scope.questions.$remove($scope.question).then(function(data){
			$scope.question = $scope.questions[0];
			$scope.updateQuestionsSelect();
		});
	};
	
	$scope.updateQuestionsSelect = function() {
		if ($scope.question) {
			$scope.questionText = $scope.question.questionText;
			$scope.answers = $scope.question.answers;
		} else {
			$scope.questionText = '';
			$scope.answers = [{answer: '', correct: false}];
		}
	};
	
	$scope.updateQuestion = function() {
		$scope.questions.$save($scope.question).then(function(ref) {
			$scope.questions = TestsFactory.tests($scope.lesson.$id);
			$scope.questions.$loaded().then(function(data) {
				$scope.question = $scope.questions.$getRecord(ref.key());
				$scope.updateQuestionsSelect();
			});
		});
	};
});