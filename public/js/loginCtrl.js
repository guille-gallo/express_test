var expressTestAppControllers = angular.module('expressTestAppControllers', []);

expressTestAppControllers.controller('LoginCtrl', function ($scope, $http, $location, sharedProperties) {
    
    $scope.authenticate = function(user, password) {
    	if (!user || !password) {
    		alert("Please fill out both fields");
    	} else {
		    $http.post('auth.json', {username: user, password: password})
			    .success(function(data) {
			    	if (data.success == false) {
		    			$location.path('/');
		    			alert("Username or Password are incorrect. Please contact system admin.");
			    	} else if (data.success == true) {
			    		sharedProperties.setProperty(data.token);
		  				$location.path('/articles-list');
			    	};
		 	  	});
		}

		$scope.user = user;
    };
});