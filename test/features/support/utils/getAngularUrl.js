module.exports = function() {
    return browser.getCurrentUrl().then(function(url) {
        return "#" + url.split("#")[1];
    });
};
