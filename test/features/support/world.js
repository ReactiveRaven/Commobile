module.exports = function() {

    this.World = function World(callback) {
        var glob = require("glob"),
            mock = require('protractor-http-mock'),
            fs = require("fs"),
            colors = require('colors'),
            that = this;
        
        this.httpmock = mock;

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

        this.shouldContain = function(searchText, css) {
            return element.all(by.css(css))
                .getText()
                .then(function(text) {
                    if (Array.isArray(text)) {
                        text = text.join("\n");
                    }
                    if (text.indexOf(searchText) === -1) {
                        searchText = searchText.split("\n").join("\n  ");
                        text = text.split("\n").join("\n  ");
                        return require("./utils/getAngularUrl")().then(function(url) {
                            throw "Expected to find \n  " + searchText +
                                "\nin\n  " + text + "\non\n  " + url;
                        });
                    }
                });
        };

        this.shouldBeOn = function(pageName) {
            var pageInstance = this[pageName];
            return pageInstance.isOn()
                .then(function(isOn) {
                    if (!isOn) {
                        return require("./utils/getAngularUrl")()
                            .then(function(url) {
                                throw "Expecting to be on " + pageName + " at " +
                                    pageInstance.url + ", actually on " + url
                                ;
                            })
                        ;
                    }
                })
            ;
        };
        
        this.fail = function(callback, filename) {
            return function(message) {
                return that.saveScreenshot(
                    filename || "LAST_FAIL"
                ).then(function(outputFilename) {
                    callback.fail(
                        message + "\n - Saved screenshot of failed test to '".cyan +
                            outputFilename.cyan + "'".cyan
                    );
                });
            };
        };

        this.screenShotDirectory = "./test/screenshots/";

        this.saveScreenshot = function(filename, callback) {
            filename = that.screenShotDirectory + filename;
            return browser.sleep(1000)
                .then(function() {
                    return browser.takeScreenshot();
                })
                .then(function(png) {
                    var outputFilename = filename + ".png",
                        stream = fs.createWriteStream(outputFilename);

                    stream.write(new Buffer(png, "base64"));
                    stream.end();
                
                    if (typeof callback === "function") {
                        callback(outputFilename);
                    }

                    return outputFilename;
                });
        };

        callback(); // tell Cucumber we're finished and to use 'this' as the world instance
    };
};
