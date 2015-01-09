gitabit
  .directive('contributor', ['$timeout', 'GithubService', function ($timeout, GithubService) {

    return {
      controller: function($scope) {
        $scope.getContributors = function () {
          GithubService
            .contributors($scope.ownerRepo)
            .then(function (result) {

              $timeout(function() {
                if (result && angular.isArray(result)) {
                  $scope.contributors = result;
                  angular.element('#tabs li a[href="#contributor"]').trigger('click').tab('show');
                } else {
                  $scope.contributors = null;
                }
              });

            }, function (err) {
              $scope.contributors = null;
              console.error(err);
            });
        };

        $scope.$watch('ownerRepo', $scope.getContributors);

      },
      scope: {
        ownerRepo: '='
      },
      replace: true,
      templateUrl: "/feature/contributor/contributor.html"
    };

  }]);