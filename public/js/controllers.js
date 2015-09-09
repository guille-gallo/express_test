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

expressTestAppControllers.service('sharedId', function () {
    
    var property = null;

    return {
        getProperty: function () {
            return localStorage.getItem('property');
        },
        setProperty: function(value) {
        	//property = value;
        	localStorage.setItem('property', JSON.stringify(value));
        }
    };
});

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

expressTestAppControllers.controller('ArticlesListCtrl', function ($scope, $http, $location, sharedProperties, sharedId, $window) {
  			
	var token = JSON.parse(sharedProperties.getProperty());
	var url = 'http://localhost:8080/api/bears';

	$http({method: 'GET', url})
		.success(function(data) {
			var articlesData = data;
	        makeData(articlesData);		      
		})
		//if this is uncommented, it triggers error one time after reloading the item list page:
		/*.error(function(data) {
			console.log(data);
		  	alert("There has been an error processing your articles list. Please contact system admin.");
		});*/

	function makeData (articlesData) {

		$scope.articles = [];

		for (i = 0; i < articlesData.length; i++) { 
			$scope.articles[i] = articlesData[i];		
    	}

		$scope.orderProp = 'author';
		$scope.showList = false;
	} 

	$scope.getBack = function () {
		$location.path('/login');
	}

	$scope.checkItem = function (articleId) {
		sharedId.setProperty(articleId);
	}
	
	$scope.displayList = function () {
		$scope.showList = true;
	}

	$scope.saveItem = function (user) {
		console.log(user);
		$http.post('http://localhost:8080/api/bears', {
			name: user.name, 
			description: user.description,
			author: user.author
		})
		    .success(function(data) {
		    	console.log(data);
	 	  	});
	 	//need to call window reload if not the item list is not updated when showing list again.
		$window.location.reload();
	};

});

expressTestAppControllers.controller('ArticlesDetailCtrl', function ($scope, $http, $location, sharedProperties, sharedId, $window) {



	var token = JSON.parse(sharedProperties.getProperty());
	var url = 'http://localhost:8080/api/bears';

	$http({method: 'GET', url})
		.success(function(data) {

			var articlesData = data;

	        makeData(articlesData);		      
			
		})
		.error(function(data) {
		  	alert("There has been an error processing your articles list. Please contact system admin.");
		});

	function makeData (articlesData, images) {
		$scope.articles = [];

		for (i = 0; i < articlesData.length; i++) { 
			$scope.articles[i] = articlesData[i];		
    	}
		
		$scope.orderProp = 'author';
		checkItem($scope.articles);
	}

	function checkItem (items) {
		var theID = JSON.parse(sharedId.getProperty());

		for (i=0; i < items.length;i++) {
			if (theID === items[i]._id) {
				$scope.articulo = {
					name: items[i].name,
					description: items[i].description,
					author: items[i].author,
					_id: items[i]._id
				}
			}
		}
	}

	$scope.deleteItem = function (item) {
	 	$http.delete('http://localhost:8080/api/bears/' + item)
		    .success(function(data) {
		    	console.log(data);
		  	});
		//need to call window reload if not the item list is not updated when showing list again.
		$window.location.reload();
	}

	$scope.updateItem = function (item) {
	 	$http.put('http://localhost:8080/api/bears/' + item, {
	 		"name": $scope.articulo.name,
	 		"description": $scope.articulo.description,
	 		"author": $scope.articulo.author
	 	})
		    .success(function(data) {
		    	console.log(data);
		  	});

		//need to call window reload if not the item list is not updated when showing list again.
		$window.location.reload();
	}
});