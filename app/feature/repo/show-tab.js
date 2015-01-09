gitabit
  .directive('showTab',
    function () {
      return {
        link: function (scope, element, attrs) {
          element.click(function (e) {
            e.preventDefault();

            // hide all tabs
            jQuery('.tab-pane').css('display', 'none');

            // display selected tab
            jQuery('#' + attrs['tab']).css('display', 'block');

            // activate tab
            jQuery(element).css('display', 'block').tab('show');
          });
        }
      };
    });