gitabit
  .controller('repoCtrl', ['$scope', '$rootScope', '$route', '$timeout',
    function ($scope, $rootScope, $route, $timeout) {

      $rootScope.activePage = 'repo';
      $scope.ownerRepo = null;
      $scope.timelineData = [
        {name: "Greg", score: 98},
        {name: "Ari", score: 96},
        {name: 'Q', score: 75},
        {name: "Loser", score: 48}
      ];

      if ($route.current.params &&
        $route.current.params.owner &&
        $route.current.params.repo) {
        $timeout(function () {
          $scope.ownerRepo = $route.current.params.owner + '/' + $route.current.params.repo;
        });
      }

    }]);