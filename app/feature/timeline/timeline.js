gitabit
  .directive('timeline', ['$window', '$timeout', 'GithubService', function ($window, $timeout, GithubService) {

    return {
      controller: function($scope) {



        $scope.getCommits = function () {
          GithubService
            .getLastNCommits($scope.ownerRepo)
            .then(function (result) {

              $timeout(function() {
                if (result && angular.isArray(result)) {
                  $scope.commitData = _.map(result, function(item) {
                    if (item && item.commit && item.commit.author) {
                      var time = item.commit.author.date;
                      return {
                        name: item.commit.author.name,
                        time: time
                      };
                    }
                  });
                } else {
                  $scope.commitData = null;
                }
              });

            }, function (err) {
              $scope.commitData = null;
              console.error(err);
            });
        };

        $scope.$watch('ownerRepo', $scope.getCommits);

      },
      restrict: 'A',
      scope: {
        ownerRepo: '=',
        commitsCount: '='
      },
      link: function (scope, ele, attrs) {

        var renderTimeout;
        var margin = parseInt(attrs.margin) || 20,
          barHeight = parseInt(attrs.barHeight) || 20,
          barPadding = parseInt(attrs.barPadding) || 5;

        var svg = d3.select(ele[0])
          .append('svg')
          .attr('width', 800);
          //.style('width', '100%');

        $window.onresize = function () {
          scope.$apply();
        };

        scope.$watch(function () {
          return angular.element($window)[0].innerWidth;
        }, function () {
          scope.render(scope.commitData);
        });

        scope.$watch('commitData', function (newData) {
          scope.render(newData);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) clearTimeout(renderTimeout);

          renderTimeout = $timeout(function() {
            var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                height = data.length * (barHeight + barPadding),
                color = d3.scale.category20(),
                xScale = d3.time.scale()
                  .domain([new Date(data.time), d3.time.day.offset(new Date(data.time), 1)])
                  .rangeRound([0, width - margin.left - margin.right]);

            svg.attr('height', height);

            svg.selectAll('rect')
              .data(data)
              .enter()
                .append('rect')
                .on('click', function(d,i) {
                  return scope.onClick({item: d});
                })
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', Math.round(margin/2))
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding);
                })
                /*.attr('fill', function(d) {
                  return color(d.name);
                })*/
                .transition()
                  .duration(1000)
                  .attr('width', function(d) {
                    return xScale(d.time);
                  });
            svg.selectAll('text')
              .data(data)
              .enter()
                .append('text')
                .attr('fill', '#fff')
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding) + 15;
                })
                .attr('x', 15)
                .text(function(d) {
                  return d.name;
                });
          }, 200);

          /*
          renderTimeout = $timeout(function () {

            var margin = {top: 50, right: 30, bottom: 30, left: 40},
                width = 260 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var chart = svg
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              x.domain(data.map(function(d) { return d.name; }));
              y.domain([0, d3.max(data, function(d) { return d.time; })]);

              chart.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              chart.append("g")
                  .attr("class", "y axis")
                  .call(yAxis);

              chart.selectAll(".bar")
                  .data(data)
                  .enter()
                  .append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) { return x(d.name); })
                  .attr("y", function(d) { return y(d.time); })
                  .attr("height", function(d) { return height - y(d.time); })
                  .attr("width", x.rangeBand());

          }, 200);
          */
        };


      }
    }

  }]);
