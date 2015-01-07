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
                if (statusCode !== 200) {
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
              url: address + '/repos/' + ownerRepo + '/contributors',
              method: 'GET'
            })
              .success(function (response, statusCode) {
                if (statusCode !== 200) {
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

        getLastNCommits: function(count) {
          var mDefer = $q.defer(),
              count = count || 100;

          if (count) {
            $http({
              url: address + '/repos/' + ownerRepo + '/contributors',
              method: 'GET'
            })
              .success(function (response, statusCode) {
                if (statusCode !== 200) {
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

          '/repos/golang/go/stats/commit_activity';
        }
      };
    }]);