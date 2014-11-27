module.exports = function() {
    "use strict";
    
    this.Then(/^I should be able to browse all artists$/, function (callback) {
        this.shouldContain("Artists", ".tab-title")
            .then(callback, this.fail(callback));
    });
    
};