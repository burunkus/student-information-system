var myApp = angular.module('myStudentInfoSysApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		controller: 'StudentsController',
		templateUrl: '/views/home.html',
		title: 'Student Information System'
	})
	.when('/home', {
		controller: 'StudentsController',
		templateUrl: '/views/home.html',
		title: 'Student Information System'
	})
	.when('/students', {
		controller: 'StudentsController',
		templateUrl: '/views/students.html',
		title: 'List of Students'
	})
	.when('/student/details/:id', {
		controller: 'StudentsController',
		templateUrl: '/views/student_details.html',
		title: 'Show Student'
	})
	.when('/student/find', {
		controller: 'StudentsController',
		templateUrl: '/views/find_student.html',
		title: 'Find a Student'
	})
	.when('/student/add', {
		controller: 'StudentsController',
		templateUrl: '/views/add_student.html',
		title: 'Add a Student'
	})
	.when('/student/edit/:id', {
		controller: 'StudentsController',
		templateUrl: '/views/edit_student.html',
		title: 'Update Student'
	})
	.otherwise({
		redirectTo: '/'
	});
	/*
    //configuring Auth0
    angularAuth0Provider.init({
		clientID: '60oitXSRxUxE1Za11u9HFXNI8s7NQnHv',
		domain: 'authourizing-client.auth0.com',
		responseType: 'token id_token',
      	audience: 'https://api-schoolinformationsystem.com',
      	redirectUri: 'http://localhost:9090/callback',
      	scope: 'openid profile read:students create:student read:student update:student delete:student'
	});

    // Configure a tokenGetter so that the isAuthenticated
    // method from angular-jwt can be used
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      }
    });
	*/
    //remove ! from the hash.
	$locationProvider.hashPrefix('');

	//use HTML History API
	//$locationProvider.html5Mode(true);
});
