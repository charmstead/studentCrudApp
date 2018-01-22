var app = angular.module('studentApp', ['ngRoute', 'ngResource']); 

app.run(function($rootScope) {
	$rootScope.accessors = {
	  getId: function(row) {
		return row._id;
	  }
	}
  });


app.config(function($routeProvider){
	$routeProvider
		
		.when('/', {
			templateUrl: 'intro.html',
			controller: 'rootController'
		})
		
		.when('/all', {
			templateUrl: 'listing.html',
			controller: 'mainController'
		})
	
		.when('/student/:id', {
			templateUrl: 'profile.html',
			controller: 'studentController'
		}).otherwise({
			redirectTo:'/'
		})

});


app.factory('studentService', function($resource){
	return $resource('/student/:id');
});

app.controller('mainController', function($scope, $rootScope, $location,studentService){
	$scope.students = studentService.query();
	$scope.address = { street: "", city: "", state: "", zipCode:"" };

	$scope.student={name:"",age:"",matricNumber:"",department:{title:""},address:$scope.address};

	$scope.submit = function() {
		
		$scope.student.created_at = Date.now();
		studentService.save($scope.student, function(){
			$scope.students = studentService.query();
			$scope.address = { street: "", city: "", state: "", zipCode:"" };
			
			$scope.student={name:"",age:"",matricNumber:"",department:{title:""},address:$scope.address};
		});
	};

	
	$scope.delete = function($index){

		var id = $rootScope.accessors.getId($scope.students[$index]);
		studentService.delete({id: id},function(){
			$scope.students = studentService.query();
		});
		
	};

});


app.controller('studentController', function($scope,$http, $rootScope,$routeParams, studentService){
	
	var id = $routeParams.id;

	$scope.course ={userId:id, title:"",description:""}
	$scope.student=studentService.get({id:id});
	$scope.alert=false;
	

	$scope.submit = function() {
		console.log($scope.student);
		$http.put('/student/'+id, $scope.student).success(function(data){
			if(data.state == 'success'){
				
				
				$scope.student=studentService.get({id:id});
				$rootScope.alert=true;
			}
			else{
				$scope.alert=false;
				$scope.error_message = data.message;
			}
		});
	};

	$scope.addCourse = function() {
		console.log($scope.course);
		$http.post('/course', $scope.course).success(function(data){
			if(data.state == 'success'){
				
				$scope.student=studentService.get({id:id});
				console.log($scope.student);
				$scope.course ={userId:id, title:"",description:""}
				
			}
			else{
				$scope.alert=false;
				$scope.error_message = data.message;
			}
		});
	};

	

});

app.controller('rootController', function($scope,$window, $location,$timeout){
	
	$timeout( function(){
		// alert();
		// $location.path("/all");
	}, 5000 );
});
