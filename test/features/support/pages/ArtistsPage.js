var BasePage = require("./BasePage"),
    ArtistsPage = function ArtistsPage() {
        BasePage.call(this, "ArtistsPage", "#/artists");
        var browseArtistsElem = element(by.id("browseartists")),
            artistElems = element.all(by.css(".artist"));

        this.countArtists = function() {
            return artistElems.count();
        };
    };
ArtistsPage.prototype = Object.create(require("./BasePage"));
ArtistsPage.prototype.constructor = ArtistsPage;

module.exports = ArtistsPage;
