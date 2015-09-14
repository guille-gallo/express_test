var expressTestAppControllers = angular.module('expressTestAppControllers');

expressTestAppControllers.controller('ArticlesListCtrl', function ($scope, $http, $location, sharedProperties, sharedId, $window) {
  			
	var token = JSON.parse(sharedProperties.getProperty());
	var url = 'http://localhost:8080/api/items';

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

		for (var i = 0; i < articlesData.length; i++) { 
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
		$scope.showBorrowedList = false;
	}

	$scope.saveItem = function (article) {
		console.log(article);

		$http.post('http://localhost:8080/api/items', {
			name: article.name, 
			description: article.description,
			author: article.author
		})
		    .success(function(data) {
		    	console.log(data);
	 	  	});
	 	//need to call window reload if not the item list is not updated when showing list again.
		$window.location.reload();
	};

	$scope.displayBorrowedList = function () {
		$scope.showBorrowedList = true;
		$scope.showList = false;

		$scope.borrow = [];

		var articles = $scope.articles;

		for (var i = 0; i < articles.length; i++) {
			if (articles[i].borrowed) {
				$scope.borrow[i] = articles[i];
			}			
		}
	}
});