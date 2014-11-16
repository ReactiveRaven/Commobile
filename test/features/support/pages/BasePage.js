module.exports = function BasePage(name, url) {
    var self = this;
    this.url = url;
    this.name = name;

    this.get = function() {
        return browser.get(this.url);
    };

    this.isOn = function() {
        return require("../utils/getAngularUrl")().then(function(url) {
            return url === self.url;
        });
    };
};
