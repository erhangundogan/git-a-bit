gitabit
  .factory('GithubService', ['$timeout', '$http', '$q',
    function ($timeout, $http, $q) {

      var address = 'https://api.github.com';

      return {
        search: function (query) {
          var mDefer = $q.defer(),
            queryPath = '/search/repositories';

          if (query) {
            $http({
              url: address + queryPath,
              method: 'GET',
              params: { q: query }
            })
              .success(function (response, statusCode) {
                // 202 github cached results
                if (statusCode !== 200 && statusCode !== 202) {
                  mDefer.reject(response.error);
                } else {
                  mDefer.resolve(response);
                }
              })
              .error(function (err) {
                mDefer.reject(err);
              })
          } else {
            $timeout(function() {
              mDefer.reject('No query specified!');
            });
          }

          return mDefer.promise;
        },

        contributors: function(ownerRepo) {
          var mDefer = $q.defer();

          if (ownerRepo) {
            $http({
              url: address + '/repos/' + ownerRepo + '/contributors?per_page=10',
              method: 'GET'
            })
              .success(function (response, statusCode) {
                if (statusCode !== 200 && statusCode !== 202) {
                  mDefer.reject(response.error);
                } else {
                  mDefer.resolve(response);
                }
              })
              .error(function (err) {
                mDefer.reject(err);
              })
          } else {
            $timeout(function() {
              mDefer.reject('No owner/repository specified!');
            });
          }

          return mDefer.promise;
        },

        getLastNCommits: function(ownerRepo, commitsCount) {
          var mDefer = $q.defer(),
              commitsCount = commitsCount || 100;

          if (commitsCount && ownerRepo) {
            $http({
              url: address + '/repos/' + ownerRepo + '/commits?per_page=' + commitsCount,
              method: 'GET'
            })
              .success(function (response, statusCode) {
                if (statusCode !== 200 && statusCode !== 202) {
                  mDefer.reject(response.error);
                } else {
                  mDefer.resolve(response);
                }
              })
              .error(function (err) {
                mDefer.reject(err);
              })
          } else {
            $timeout(function() {
              mDefer.reject('No owner/repository or commit count not specified!');
            });
          }

          return mDefer.promise;
        },

        getRepository: function(ownerRepo) {
          var mDefer = $q.defer();

          if (ownerRepo) {
            $http({
              url: address + '/repos/' + ownerRepo,
              method: 'GET'
            })
              .success(function (response, statusCode) {
                if (statusCode !== 200 && statusCode !== 202) {
                  mDefer.reject(response.error);
                } else {
                  mDefer.resolve(response);
                }
              })
              .error(function (err) {
                mDefer.reject(err);
              })
          } else {
            $timeout(function() {
              mDefer.reject('No owner/repository not specified!');
            });
          }

          return mDefer.promise;
        },

        getCommitsTimeline: function(ownerRepo, commitsCount) {
          var mDefer = $q.defer(),
              repoInformation= null,
              commitsCount = commitsCount || 100;

          function getDateText(date) {
            var dateText = [];
            dateText.push(date.getFullYear());
            dateText.push(date.getMonth() + 1);
            dateText.push(date.getDate());
            dateText.push(date.getHours());
            dateText.push(date.getMinutes());
            dateText.push(date.getSeconds());
            return dateText.join(',')
          }

          if (commitsCount && ownerRepo) {
            $http({
              url: address + '/repos/' + ownerRepo + '/commits?per_page=' + commitsCount,
              method: 'GET'
            })
              .success(function (response, statusCode) {
                if (statusCode !== 200 && statusCode !== 202) {
                  mDefer.reject(response.error);
                } else {

                  var startDateItem = _.min(response, function(item) {
                    if (item.commit && item.commit.author && item.commit.author.date) {
                      return new Date(item.commit.author.date);
                    }
                  });

                  var timelineData = {
                    timeline: {
                      headline: ownerRepo,
                      type: "default",
                      startDate: getDateText(new Date(startDateItem.commit.author.date)),
                      text: '',
                      date: []
                    }
                  };

                  _.each(response, function(item) {
                    var newItem = {
                      startDate: getDateText(new Date(item.commit.author.date)),
                      headline: item.commit.author.name,
                      text: '<div class="timeline-commit"><a class="btn btn-primary" href="' + item.html_url +
                            '">commit</a></div><br/><div class="timeline-commit-detail">' + item.commit.message + '</div>'
                    };
                    timelineData.timeline.date.push(newItem);
                  });

                  mDefer.resolve(timelineData);
                }
              })
              .error(function (err) {
                mDefer.reject(err);
              })
          } else {
            $timeout(function() {
              mDefer.reject('No owner/repository or commit count not specified!');
            });
          }

          return mDefer.promise;
        }
      };
    }]);