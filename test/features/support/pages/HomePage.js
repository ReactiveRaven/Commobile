var BasePage = require("./BasePage"),
    HomePage = function HomePage() {
        BasePage.call(this, "HomePage", "#/home");
        var browseArtistsElem = element(by.id("browseartists"));
        
        this.canBrowseArtists = function() {
            return browseArtistsElem.isPresent();
        };
    };
HomePage.prototype = Object.create(require("./BasePage"));
HomePage.prototype.constructor = HomePage;

module.exports = HomePage;
