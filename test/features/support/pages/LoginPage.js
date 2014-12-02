var BasePage = require("./BasePage"),
    LoginPage = function LoginPage() {
        BasePage.call(this, "LoginPage", "#/login");
        var usernameElem = element(by.id("username")),
            passwordElem = element(by.id("password")),
            submitElem = element(by.css("button"));

        this.getUsername = function() {
            return usernameElem.getAttribute("value");
        };

        this.login = function(username, password) {
            usernameElem.sendKeys(username);
            passwordElem.sendKeys(password);
            return submitElem.click();
        };
    };
LoginPage.prototype = Object.create(BasePage);
LoginPage.prototype.constructor = LoginPage;

module.exports = LoginPage;
