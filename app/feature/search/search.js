gitabit
  .controller('searchCtrl', ['$scope', '$rootScope', '$location', 'GithubService',
    function ($scope, $rootScope, $location, GithubService) {

      $rootScope.activePage = 'search';

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

      $scope.keyPress = function (event) {
        if (event.keyCode === 13) {
          $scope.doSearch($scope.searchQuery);
        }
      };

      $scope.selectProject = function (item) {
        if (item && item.full_name) {
          $location.path('/repo/' + item.full_name);
        }
      };

    }]);