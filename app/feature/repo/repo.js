gitabit
  .controller('repoCtrl', ['$scope', '$route', '$timeout', function ($scope, $route, $timeout) {

    $scope.ownerRepo = null;

    if ($route.current.params &&
        $route.current.params.owner &&
        $route.current.params.repo) {
      $timeout(function() {
        $scope.ownerRepo = $route.current.params.owner + '/' + $route.current.params.repo;
      });
    }

  }]);