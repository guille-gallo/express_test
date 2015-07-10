var expressTestAppControllers = angular.module('expressTestAppControllers', []);

expressTestAppControllers.service('sharedProperties', function () {
    
    var property = null;

    return {
        getProperty: function (value) {
            return localStorage.getItem('token');
        },
        setProperty: function(value) {
        	localStorage.setItem('token', JSON.stringify(value));
        }
    };
});

expressTestAppControllers.controller('LoginCtrl', function ($scope, $http, $location, sharedProperties) {
    
    $scope.authenticate = function(user, password) {
	    $http.post('auth.json', {username: user, password: password})
		    .success(function(data, status, headers, config) {
		    	if (data.success == false) {
	    			$location.path('/');
	    			alert("There has been an error processing your login request. Please contact system admin.");
		    	} else {
		    		sharedProperties.setProperty(data.token);
	  				$location.path('/articles-list');
		    	};
	 	  	});
    };
});

expressTestAppControllers.controller('ArticlesListCtrl', function ($scope, $http, $location, sharedProperties) {
  			
	var token = JSON.parse(sharedProperties.getProperty());
	var url = 'articles.json';

	$http({method: 'GET', url, headers: {token: token}})
		.success(function(data) {
			makeData(data);
		})
		.error(function(data) {
		  	alert("There has been an error processing your articles list. Please contact system admin.");
		});

	function makeData (data) {
		$scope.articles = [];
		for (i = 0; i < data.length; i++) { 
			$scope.articles[i] = data[i];
		}
		$scope.orderProp = 'author';
	}

	$scope.getBack = function () {
		$location.path('/login');
	}
});