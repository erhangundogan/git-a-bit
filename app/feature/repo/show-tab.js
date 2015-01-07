gitabit
  .directive('showTab',
    function () {
      return {
        link: function (scope, element, attrs) {
          element.click(function (e) {
            e.preventDefault();
            jQuery(element).tab('show');
          });
        }
      };
    });