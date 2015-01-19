gitabit
  .directive('showTab',
    function () {
      return {
        scope: {
          activate: '&'
        },
        link: function (scope, element, attrs) {

          element.click(function (e) {
            e.preventDefault();

            // hide all tabs
            jQuery('.tab-pane').css('display', 'none');

            // display selected tab
            jQuery('#' + attrs['tab']).css('display', 'block');

            // activate tab
            jQuery(element).css('display', 'block').tab('show');

            if (attrs['tab'] === 'commit' || attrs['tab'] === 'timeline') {
              scope.activate();
            }
          });
        }
      };
    });