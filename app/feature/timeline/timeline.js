gitabit
  .directive('timeline', ['$q', '$window', '$timeout', 'GithubService',
    function ($q, $window, $timeout, GithubService) {

    return {
      controller: function($scope) {
        $scope.getCommits = function () {

          var promises = [
            GithubService.getRepository($scope.ownerRepo),
            GithubService.getCommitsTimeline($scope.ownerRepo)
          ];

          $q.all(promises).then(
            function(results) {
              if (results && results.length === 2) {
                var data = results[0];
                var timelineData = results[1];
                timelineData.timeline.text = _.template(timelineData.timeline.text);

                $timeout(
                  function() {
                    $window.createStoryJS({
                      type: 'timeline',
                      width: '100%',
                      height: '600',
                      source: timelineData,
                      embed_id: 'timeline'
                    });

                    angular.element($window).triggerHandler('resize');
                  }
                );
              }
            },
            function(errors) {
              console.error(errors);
            }
          );

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
