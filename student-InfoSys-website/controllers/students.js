var myApp = angular.module('myStudentInfoSysApp');

myApp.controller('StudentsController', ['$scope', '$http', '$location', '$routeParams', '$timeout', '$window', '$route',/*'authService', */function($scope, $http, $location, $routeParams, $timeout, $window, $route/*,$authService*/){
	$scope.getStudents = function() {
		$http.get('/students').then(function(response) {
			//if there are students, display students.
			if(response.data){
				$scope.found = false;
				$scope.students = response.data;
			}
			//if there are no students, send and alert message to user
			else if(response.data.message){
				$scope.found = true;
				$scope.message = response.data.message;
			}
		}, function(error) {
			$scope.students = error.data;
		});
	};	

	$scope.getStudent = function() {
		var studentNumber = $routeParams.id;
		$http.get('/student/'+studentNumber).then(function(response) {
			//if the student is found, display the student. 
			if(response.data.data){
				$scope.found = false;
				$scope.student = response.data.data;
			}
			//if the student is not found, display Alert to user for some seconds.
			else if(response.data.message){
				$scope.found = true;
				$scope.message = response.data.message;
				$timeout(function() {
					$scope.found = false;
				}, 6000);
				$window.location.href='/';
			}
		}, function(error) {
			$scope.student = error.data;
		});
	};

	$scope.addStudent = function() {
		$http.post('/student/create', $scope.student).then(function(response) {
			if(response.data){
				$scope.found = true;
				$scope.message = response.data;
				$timeout(function() {
					$scope.found = false;
				}, 4000);
				$window.location.reload();
				//$route.reload();
			}
		}, function(error) {
			$scope.student = error.data;
		});
	};

	$scope.updateStudent = function() {
		var studentNumber = $routeParams.id;
		$http.put('/student/update/'+studentNumber, $scope.student).then(function(response) {
			if(response.data.message){
				$scope.found = true;
				$scope.message = response.data.message;
				$timeout(function() {
					$scope.found = false;
				}, 5000);
				$window.location.href='/';
			}
		}, function(error) {
			$scope.message = error.data;
		});
	};

	$scope.removeStudent = function(studentNumber) {
			$http.delete('/student/delete/'+studentNumber).then(function(response) {
				if(response.data.message){
					$window.alert(response.data.message);
				}
			}, function(error) {
				$scope.message = error.data;
			});
	};

}]);

//listen for page route changes and update the title of the current page.
myApp.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
		if(current.$$route) {
			$rootScope.title = current.$$route.title;
		}
	});
}]);

//on click delete, if confirm delete is ok delete, else remain on the same page. 
myApp.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick;
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction);
                    } else {
                    	event.stopImmediatePropagation();
                    	event.preventDefault();
                    }
                });
            }
        };
}]);
