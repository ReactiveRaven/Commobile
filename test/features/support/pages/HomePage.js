var BasePage = require("./BasePage"),
    HomePage = function HomePage() {
        BasePage.call(this, "HomePage", "#/home");
    };
HomePage.prototype = Object.create(require("./BasePage"));
HomePage.prototype.constructor = HomePage;

module.exports = HomePage;
