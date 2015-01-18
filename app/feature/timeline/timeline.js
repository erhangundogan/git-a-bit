gitabit
  .directive('timeline', ['$window', '$timeout', 'GithubService',
    function ($window, $timeout, GithubService) {

    return {
      controller: function($scope) {
        $scope.getCommits = function () {
          GithubService
            .getLastNCommits($scope.ownerRepo)
            .then(function (result) {

              $timeout(function() {
                if (result && angular.isArray(result)) {
                  $scope.commitData = _.map(result, function(item) {
                    if (item && item.commit && item.commit.author) {
                      var time = item.commit.author.date;
                      return {
                        name: item.commit.author.name,
                        time: time
                      };
                    }
                  });
                } else {
                  $scope.commitData = null;
                }
              });

            }, function (err) {
              $scope.commitData = null;
              console.error(err);
            });
        };

        $scope.$watch('ownerRepo', $scope.getCommits);

      },
      restrict: 'A',
      scope: {
        ownerRepo: '=',
        commitsCount: '='
      }
    }

  }]);
