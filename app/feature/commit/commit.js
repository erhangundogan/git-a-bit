gitabit
  .directive('commit', ['$timeout', 'GithubService', function ($timeout, GithubService) {

    return {
      controller: function ($scope) {
        $scope.getCommits = function () {
          GithubService
            .getLastNCommits($scope.ownerRepo, $scope.commitsCount)
            .then(function (result) {

              $timeout(function () {
                if (result && angular.isArray(result)) {

                  $scope.commitsCount = result.length || 0;

                  $scope.commitItems = {};
                  _.groupBy(result, function (item) {
                    if (item && item.commit && item.commit.author && item.commit.author.name) {
                      $scope.commitItems[item.commit.author.name] = $scope.commitItems[item.commit.author.name] || [];
                      $scope.commitItems[item.commit.author.name].push(item);
                    }
                  });

                  $scope.commitItems = _.sortBy($scope.commitItems, function (item) {
                    return item.length;
                  });

                  $scope.commitItems.reverse();

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
        commitsCount: '=',
        activate: '='
      },
      replace: true,
      templateUrl: "/feature/commit/commit.html",
      link: function (scope, el) {

        scope.$watch('activate', function (after, before) {
          // if commit tab is activated
          if (after === true && !before) {
            scope.activateProgressBars();
          }
        });

        scope.activateProgressBars = function () {
          jQuery('.progress-wrap', el).each(function (index, item) {
            var getPercent = jQuery(item).data('progress-percent') / 100;
            var getProgressWrapWidth = jQuery(item).width();
            var progressTotal = getPercent * getProgressWrapWidth;
            var animationLength = 2000;

            // on page load, animate percentage bar to data percentage length
            // .stop() used to prevent animation queueing
            jQuery('.progress-bar', item).stop().animate({
              left: progressTotal
            }, animationLength);
          });
        }
      }
    };

  }]);