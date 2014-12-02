module.exports = function() {
    "use strict";

    this.Given(/^I am on the homepage$/, function (callback) {
        var self = this;
        this.HomePage
            .get()
            .then(function() {
                return self.shouldBeOn("HomePage");
            })
            .then(callback, this.fail(callback));
    });

    this.Then(/^I should be able to browse all artists$/, function (callback) {
        this.shouldContain("Artists", ".tab-title")
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