module.exports = function() {
    "use strict";

    this.Given(/^I am logged out$/, function(callback) {
        browser.get("/#/forcelogout")
            .then(callback, this.fail(callback));
    });

    this.Then(/^I should be prompted to log in$/, function(callback) {
        this.shouldContain("Log in", "html")
            .then(callback, this.fail(callback));
    });

    this.When(/^I log in successfully$/, function(callback) {

        this.httpmock(["login-success"]);
        
        var self = this;
        
        this.LoginPage
            .get()
            .then(function() {
                return self.LoginPage.login("testuser", "testpass");
            })
            .then(callback, this.fail(callback));
    });

    this.Then(/^I should be sent to my homepage$/, function(callback) {
        this.shouldBeOn("HomePage")
            .then(callback, this.fail(callback));
    });

    this.When(/^I log in incorrectly$/, function(callback) {
        this.LoginPage
            .login("baduser", "badpass")
            .then(callback, this.fail(callback));
    });

    this.Then(/^I should be warned my log in details are bad$/, function(callback) {
        this.shouldContain("Incorrect log in", ".warning")
            .then(callback, this.fail(callback));
    });

    this.Given(/^I am on the start page$/, function(callback) {
        this.LoginPage
            .get()
            .then(callback, this.fail(callback));
    });

    this.Then(/^I should see "([^"]*)"$/, function(arg1, callback) {
        element(by.css("html"))
            .getText()
            .then(function(text) {
                if (text.indexOf(arg1) === -1) {
                    throw "Expected to see '" + arg1 + "' but saw '" + text + "'";
                }
            })
            .then(callback, this.fail(callback));
    });
    
    this.When(/^I arrive on the login page$/, function(callback) {
        this.LoginPage
            .get()
            .then(callback, this.fail(callback));
    });
    
    this.Then(/^I should not see any warnings$/, function (callback) {
        element(by.css(".warning"))
            .isPresent()
            .then(function(isPresent) {
                if (isPresent) {
                    throw "Should not see any warnings";
                }
            })
            .then(callback, this.fail(callback));
    });

};
