gitabit
  .controller('repoCtrl', ['$scope', '$rootScope', '$route', '$timeout',
    function ($scope, $rootScope, $route, $timeout) {

      $rootScope.activePage = 'repo';
      $scope.ownerRepo = null;
      $scope.inProgress = false;

      if ($route.current.params &&
        $route.current.params.owner &&
        $route.current.params.repo) {
        $timeout(function () {
          $scope.ownerRepo = $route.current.params.owner + '/' + $route.current.params.repo;
        });
      }

      $scope.activateProgress = function() {
        // we should trigger digestion cycle to activate commit directive
        $timeout(function() {
          $scope.inProgress = true;
        });
      };

    }]);