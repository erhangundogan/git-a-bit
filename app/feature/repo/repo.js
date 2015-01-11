gitabit
  .controller('repoCtrl', ['$scope', '$rootScope', '$route', '$timeout',
    function ($scope, $rootScope, $route, $timeout) {

      $rootScope.activePage = 'repo';
      $scope.ownerRepo = null;

      if ($route.current.params &&
        $route.current.params.owner &&
        $route.current.params.repo) {
        $timeout(function () {
          $scope.ownerRepo = $route.current.params.owner + '/' + $route.current.params.repo;
        });
      }

    }]);