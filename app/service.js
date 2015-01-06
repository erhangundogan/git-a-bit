gitabit
  .factory('GithubService', ['$rootScope', '$http', '$q',
    function ($rootScope, $http, $q) {
      return {
        search: function (query) {
          var mDefer = $q.defer(),
              url = 'https://api.github.com/';

          if (query) {

            $http.get(url)
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
        }
      };
    }]);