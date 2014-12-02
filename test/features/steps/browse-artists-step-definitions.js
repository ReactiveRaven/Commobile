module.exports = function() {
    "use strict";

    this.Then(/^I should be able to browse all artists$/, function (callback) {
        this.shouldContain("Artists", ".tab-title")
            .then(callback, this.fail(callback));
    });

    this.Given(/^I am browsing artists$/, function (callback) {
        var self = this;
        this.ArtistsPage
            .get()
            .then(function() {
                return self.shouldBeOn("ArtistsPage");
            })
            .then(callback, this.fail(callback));
    });

    this.Given(/^there are at least three artists registered$/, function (callback) {
        this.httpmock(["artists/three"]);
        callback();
    });

    this.Then(/^I should see at least (\d+) artists$/, function (minArtists, callback) {
        this.ArtistsPage
            .countArtists()
            .then(function(artistCount) {
                if (artistCount < minArtists) {
                    throw "Expecting to see " + minArtists + " artists, but saw " + artistCount;
                }
            })
            .then(callback, this.fail(callback));
    });

};