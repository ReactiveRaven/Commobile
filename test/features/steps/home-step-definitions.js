module.exports = function() {
    "use strict";
    
    this.Given(/^I am on the homepage$/, function (callback) {
        this.HomePage
            .get()
            .then(callback, this.fail(callback));
    });
    
    this.Then(/^I should be able to browse all artists$/, function (callback) {
        this.HomePage
            .canBrowseArtists()
            .then(function(canBrowse) {
                if (!canBrowse) {
                    throw "Expected to be able to browse artists";
                }
            })
            .then(callback, this.fail(callback));
    });

    this.Then(/^I should see a list of featured artworks$/, function (callback) {                        
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should be able to quickly access my messages$/, function (callback) {                  
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should be able to see a count of unread messages$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
    
    this.Then(/^I should be able to search for artists$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
                                                                                                     
    this.Then(/^I should be able to search for artworks$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
    
};