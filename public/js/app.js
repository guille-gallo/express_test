var expressTestApp = angular.module('expressTestApp', [
  'ngRoute',
  'sharedProperties',
  'sharedId',
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
      otherwise({
        redirectTo: '/login'
      });
}]);