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

expressTestAppControllers.controller('ArticlesListCtrl', function ($scope, $http, $location, sharedProperties, sharedId) {
  			
	var token = JSON.parse(sharedProperties.getProperty());
	var url = 'articles.json';

	$http({method: 'GET', url, headers: {token: token}})
		.success(function(data) {

			var articlesData = data;
			/*console.log(articlesData);
			if (!articlesData){
				$scope.isDisabled = true;
			}*/

			$http.get('articles/photos.json')
				.success(function(data) {

			      var images = data;

			      makeData(articlesData, images);		      
			    });
		})
		.error(function(data) {
		  	alert("There has been an error processing your articles list. Please contact system admin.");
		});

	function makeData (articlesData, images) {



		$scope.articles = [];

		for (i = 0; i < articlesData.length; i++) { 
			$scope.articles[i] = articlesData[i];		
    	}
		for (i = 0; i < images.length; i++) {
			if ($scope.articles[i].id === images[i].id) {
				$scope.articles[i].imageUrl = (images[i].imageUrl);
			}				
		};
		
		$scope.orderProp = 'author';
		$scope.showList = false;
	} 

	$scope.getBack = function () {
		$location.path('/login');
	}

	$scope.checkArticle = function (articleId) {
		sharedId.setProperty(articleId);
	}
	
	$scope.displayList = function () {
		$scope.showList = true;
	}

});

expressTestAppControllers.controller('ArticlesDetailCtrl', function ($scope, $http, $location, sharedProperties, sharedId) {



	var token = JSON.parse(sharedProperties.getProperty());
	var url = 'articles.json';

	$http({method: 'GET', url, headers: {token: token}})
		.success(function(data) {

			var articlesData = data;

			$http.get('articles/photos.json')
				.success(function(data) {

			      var images = data;

			      makeData(articlesData, images);		      
			    });
		})
		.error(function(data) {
		  	alert("There has been an error processing your articles list. Please contact system admin.");
		});

	function makeData (articlesData, images) {
		$scope.articles = [];

		for (i = 0; i < articlesData.length; i++) { 
			$scope.articles[i] = articlesData[i];		
    	}
		for (i = 0; i < images.length; i++) {
			if ($scope.articles[i].id === images[i].id) {
				$scope.articles[i].imageUrl = (images[i].imageUrl);
			}				
		};
		
		$scope.orderProp = 'author';

		checkItem($scope.articles);
	}

	function checkItem (items) {
		var theID = JSON.parse(sharedId.getProperty());
		console.log(theID)
		for (i=0; i < items.length;i++) {
			if (theID === items[i].id) {
				$scope.articulo = {
					title: items[i].title,
					author: items[i].author,
					body: items[i].body,
					imageUrl: items[i].imageUrl
				}
			}
		}
	}
});