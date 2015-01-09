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
              mDefer.reject('No owner/repository or commit count specified!');
            });
          }

          return mDefer.promise;
        }
      };
    }]);