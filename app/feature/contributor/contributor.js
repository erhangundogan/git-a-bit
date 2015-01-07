gitabit
  .directive('contributor', ['GithubService', function (GithubService) {

    return {
      controller: function($scope) {
        $scope.getContributors = function () {
          GithubService
            .contributors($scope.owner, $scope.repo)
            .then(function (result) {
              if (result && result.items && result.items.length > 0) {
                $scope.repos = result.items;
              } else {
                $scope.repos = null;
              }
            }, function (err) {
              $scope.repos = null;
              console.error(err);
            });
        };
      },
      scope: {
        owner: '&',
        repo: '&'
      },
      replace: true,
      templateUrl: "/features/contributor/contributor.html"
    };

  }]);