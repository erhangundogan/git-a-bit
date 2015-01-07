gitabit
  .controller('searchCtrl', ['$scope', 'GithubService', function ($scope, GithubService) {

    $scope.doSearch = function (query) {
      GithubService
        .search(query)
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

    $scope.selectProject = function(item) {
      debugger;
    };

  }]);