gitabit
  .controller('repoCtrl', ['$scope', '$rootScope', '$route', '$timeout',
    function ($scope, $rootScope, $route, $timeout) {

      $rootScope.activePage = 'repo';
      $scope.ownerRepo = null;
      $scope.commitProgress = false;
      $scope.timelineProgress = false;

      if ($route.current.params &&
        $route.current.params.owner &&
        $route.current.params.repo) {
        $timeout(function () {
          $scope.ownerRepo = $route.current.params.owner + '/' + $route.current.params.repo;
        });
      }

      $scope.activateCommitProgress = function() {
        // we should trigger digestion cycle to activate commit directive
        $timeout(function() {
          $scope.commitProgress = true;
          $scope.timelineProgress = false;
        });
      };

      $scope.activateTimelineProgress = function() {
        // we should trigger digestion cycle to activate timeline directive
        $timeout(function() {
          $scope.timelineProgress = true;
          $scope.commitProgress = false;
        });
      };

    }]);