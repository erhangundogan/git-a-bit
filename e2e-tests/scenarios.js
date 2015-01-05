'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('git-a-bit', function() {

  browser.get('/');

  it('should automatically redirect to /404 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/404");
  });


  describe('404', function() {

    beforeEach(function() {
      browser.get('/404');
    });

    it('should render 404 when user navigates to /404', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).toMatch(/404/);
    });

  });

});
