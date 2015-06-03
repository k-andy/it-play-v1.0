itPlayApp.directive('testsTab', function() {
	return {
		restrict: 'A',
		templateUrl: 'views/directives/exerciseTabs/testsTab.html',
		link: function(scope, el, attrs) {
			scope.answers = [{answer: '1', correct: false}];

			scope.addAnswerFieldset = function() {
				var newAnswerNumber = scope.answers.length+1;
				scope.answers.push({'answer': newAnswerNumber, correct: false});
			};
			scope.removeChoice = function() {
				var lastAnswer = scope.answers.length-1;
				scope.answers.splice(lastAnswer);
			};
			scope.addQuestion = function() {
				
			}
		}
	}
});