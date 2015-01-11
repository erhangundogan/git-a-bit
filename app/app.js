'use strict';

// Declare app level module which depends on views, and components
var gitabit = angular

  .module('gitabit', [
    'ngRoute'
  ])


  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider

      .when('/', {
        templateUrl: '/feature/home/home.html',
        controller: ['$rootScope', function($rootScope) {
          $rootScope.activePage = 'home';
        }]
      })

      .when('/repo/:owner/:repo', {
        templateUrl: '/feature/repo/repo.html'
      })

      .when('/repo', {
        templateUrl: '/feature/repo/repo.html'
      })

      .when('/404', {
        templateUrl: '/feature/status/404.html'
      })

      .when('/search', {
        templateUrl: '/feature/search/search.html'
      })

      .otherwise({
        redirectTo: '/404'
      });

  }])

  .run(['$rootScope', function ($rootScope) {



  }]);
