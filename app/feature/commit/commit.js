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
                  $scope.commitItems = {};
                  _.groupBy(result, function(item) {
                    if (item && item.commit && item.commit.author && item.commit.author.email) {
                      $scope.commitItems[item.commit.author.email] = $scope.commitItems[item.commit.author.email] || [];
                      $scope.commitItems[item.commit.author.email].push(item);
                    }
                  });
                } else {
                  $scope.commitItems = null;
                }
              });

            }, function (err) {
              $scope.commitItems = null;
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