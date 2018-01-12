/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
            1 Failure on "RSS Feeds are defined"  Expected 0 not to be 0
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

        });

         /* following test check's through each feed
          * in allFeeds to ensure it have a URL defined and it's not empty
          */

        it('should have a URL defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });

        });
         /* following test check's through each feed
          * in allFeeds to ensure it have name definedand it's not empty
          */

        it('should have a name defined and is not empty', function() {
            allFeeds.forEach(function(name) {
                expect(name.url).toBeDefined();
                expect(name.url.length).not.toBe(0);
            });

        });
    });


    /* following test suite is for menu functions */
    describe('The menu', function() {

         /* following test check's menu element to ensure
          * it's hidden by default
          */

        it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* following test check's when menu icon is clicked,
         * it's visibility is changing
         */

        it('should change visibility when menu icon clicked', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
     });

    /* following test suite is for initial RSS Feeds */
    describe('Initial Entries', function() {
      /* this requires async approch so using done() */
        beforeEach(function(done) {
                loadFeed(0,done);
            });

         /* following test checks element within .feed container to ensure
          * it have at least a single .entry element and loadFeed function is
          * called and have completed it's task
         */

        it('should have a .entry element within the .feed container', function(done) {
             expect($('.feed').length).toBeGreaterThan(0);
             expect($('.feed .entry').length).toBeGreaterThan(0);
             done();
        });
    });


    /* following test suite for new RSS Feeds */
    describe('New Feed Selection', function() {
      /* following variables will hold the values for two feeds after loading. */
        var currentFeed;
        var newFeed;

        /* this requires async approch so using done() */
        beforeEach(function(done) {

            loadFeed(0, function(){
                currentFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });

        });
         /* following test ensures the content is changing when new feed is
          * loaded by the loadFeed function
         */
        it('feed changes when a new feed is loaded', function(done) {
            expect(currentFeed).not.toEqual(newFeed);
            done();
        });

    });
}());
