module.exports = function() {

    this.World = function World(callback) {
        var glob = require("glob"),
            that = this;

        this.prop = "Hello from the World!"; // this property will be available in step definitions

        glob.sync("./test/features/support/pages/*.js")
            .map(function(input) {
                return input.replace("./test/features/support/pages/", "").replace(".js", "");
            })
            .filter(function(input) {
                return input !== "BasePage";
            })
            .forEach(function(name) {
                var pageFunc = require("./pages/" + name + ".js");
                that[name] = new pageFunc();
            });

        this.shouldContain = function(searchText, css, callback) {
            element(by.css(css)).getText().then(function(text) {
                if (text.indexOf(searchText) !== -1) {
                    callback();
                } else {
                    searchText = searchText.split("\n").join("\n  ");
                    text = text.split("\n").join("\n  ");
                    require("./utils/getAngularUrl")().then(function(url) {
                        callback.fail(
                            "Expected to find \n  " + searchText +
                                "\nin\n  " + text + "\non\n  " + url
                        );
                    });
                }
            }, callback.fail);
        };

        this.shouldBeOn = function(pageName, callback) {
            var pageInstance = this[pageName];
            pageInstance.isOn().then(function(isOn) {
                if (isOn) {
                    callback();
                } else {
                    require("./utils/getAngularUrl")().then(function(url) {
                        callback.fail(
                            "Expecting to be on " + pageName + " at " +
                                pageInstance.url + ", actually on " + url
                        );
                    });
                }
            });
        };

        callback(); // tell Cucumber we're finished and to use 'this' as the world instance
    };
};
