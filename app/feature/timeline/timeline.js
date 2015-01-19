gitabit
  .directive('timeline', ['$q', '$window', '$timeout', 'GithubService',
    function ($q, $window, $timeout, GithubService) {

    return {
      controller: function($scope) {

        $scope.showMessage = true;
        $scope.graphShown = false;
        $scope.getCommits = function () {

          var promises = [
            GithubService.getRepository($scope.ownerRepo),
            GithubService.getCommitsTimeline($scope.ownerRepo, $scope.commitsCount)
          ];

          // this calls just for demonstration of multiple requests
          // promise library resolves all results and goes on
          $q.all(promises).then(
            function(results) {
              if (results && results.length === 2) {
                var data = results[0];
                var timelineData = results[1];
                timelineData.timeline.text = data.description;

                $timeout(
                  function() {
                    $window.createStoryJS({
                      type: 'timeline',
                      width: '100%',
                      height: '700',
                      source: timelineData,
                      embed_id: 'timeline-graph'
                    });

                    $scope.showMessage = false;
                    $scope.graphShown = true;
                  }
                );
              }
            },
            function(errors) {
              console.error(errors);
            }
          );
        };

      },
      restrict: 'A',
      scope: {
        ownerRepo: '=',
        commitsCount: '=',
        activate: '=',
        showMessage: '='
      },
      link: function(scope, element) {

        // check out scope.activate variable, and if it changes execute this method
        scope.$watch('activate', function (after, before) {
          // if timeline tab is activated
          if (after === true && !before && !scope.graphShown) {
            scope.getCommits();
          }
        });

      }
    }

  }]);
