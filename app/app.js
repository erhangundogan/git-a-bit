'use strict';

// Declare app level module which depends on views, and components
var gitabit = angular

  .module('gitabit', [
    'ngRoute'
  ]).

  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider

      .when('/404', {
        templateUrl: '/feature/status/404.html'
      })

      .otherwise({
        redirectTo: '/404'
      });

  }]);
