gitabit
  .directive('commit', ['$timeout', 'GithubService', function ($timeout, GithubService) {

    return {
      controller: function($scope) {
        $scope.getCommits = function () {
          GithubService
            .getLastNCommits($scope.ownerRepo, $scope.commitsCount)
            .then(function (result) {

              $timeout(function() {
                if (result && angular.isArray(result)) {
                  $scope.commits = result;
                } else {
                  $scope.commits = null;
                }
              });

            }, function (err) {
              $scope.commits = null;
              console.error(err);
            });
        };

        $scope.$watch('ownerRepo', $scope.getCommits);
      },
      scope: {
        ownerRepo: '=',
        commitsCount: '='
      },
      replace: true,
      templateUrl: "/feature/commit/commit.html"
    };

  }]);