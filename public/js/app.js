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
      when('/article/:articleId', {
        templateUrl: 'partials/article-detail.html',
        controller: 'ArticlesDetailCtrl'
      }).
      when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'TestCtrl'
      }).
      when('/test/:articleId', {
        templateUrl: 'partials/test-detail.html',
        controller: 'TestCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);