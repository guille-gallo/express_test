var expressTestAppControllers = angular.module('expressTestAppControllers');

expressTestAppControllers.controller('ArticlesDetailCtrl', function ($scope, $http, $location, sharedProperties, sharedId, $window) {

	var token = JSON.parse(sharedProperties.getProperty());
	var url = 'http://localhost:8080/api/items';

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
					borrowed: items[i].borrowed,
					_id: items[i]._id
				}
			}
		}
	}

	$scope.deleteItem = function (item) {
	 	$http.delete('http://localhost:8080/api/items/' + item)
		    .success(function(data) {
		    	console.log(data);
		  	});
		//need to call window reload if not the item list is not updated when showing list again.
		$window.location.reload();
	}

	$scope.updateItem = function (item) {
	 	$http.put('http://localhost:8080/api/items/' + item, {
	 		"name": $scope.articulo.name,
	 		"description": $scope.articulo.description,
	 		"author": $scope.articulo.author,
	 		"borrowed": $scope.articulo.borrowed
	 	})
		    .success(function(data) {
		    	console.log(data);
		  	});

		//need to call window reload if not the item list is not updated when showing list again.
		$window.location.reload();
	}
});