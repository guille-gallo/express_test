var expressTestApp = angular.module('expressTestApp', [
  'ngRoute',
  'expressTestAppControllers'
]);

expressTestApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/articles-list', {
        templateUrl: 'partials/articles-list.html',
        controller: 'ArticlesListCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);