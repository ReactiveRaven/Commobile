module.exports = function() {
    "use strict";

    this.Given(/^I am logged out$/, function(callback) {
        browser.get("/#/forcelogout").then(callback, callback.fail);
    });

    this.Then(/^I should be prompted to log in$/, function(callback) {
        this.shouldContain("Log in", "html", callback);
    });

    this.When(/^I log in successfully$/, function(callback) {
        this.LoginPage.login("testuser", "testpass").then(callback, callback.fail);
    });

    this.Then(/^I should be sent to my homepage$/, function(callback) {
        this.shouldBeOn("HomePage", callback);
    });

    this.When(/^I log in incorrectly$/, function(callback) {
        this.LoginPage.login("baduser", "badpass").then(callback, callback.fail);
    });

    this.Then(/^I should be warned my log in details are bad$/, function(callback) {
        this.shouldContain("Incorrect log in", "html", callback);
    });

    this.Given(/^I am on the start page$/, function(callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.get("/").then(function() {
            callback();
        });
    });

    this.Then(/^I should see "([^"]*)"$/, function(arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.css("html")).getText().then(function(text) {
            if (text.indexOf(arg1) !== -1) {
                callback();
            } else {
                callback.fail();
            }
        });
    });

};
