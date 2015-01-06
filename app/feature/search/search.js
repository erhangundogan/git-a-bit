gitabit
  .controller('searchCtrl', ['$scope', 'GithubService', function ($scope, GithubService) {
    $scope.doSearch = function (query) {
      GithubService
        .search(query)
        .then(function (result) {
          console.log(result);
        }, function (err) {
          console.error(err);
        });
    };
  }]);