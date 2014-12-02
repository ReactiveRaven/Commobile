exports.config = {
    capabilities: {
        // You can use other browsers
        // like firefox, phantoms, safari, IE (-_-)
        "browserName": "phantomjs",
        "phantomjs.binary.path": require("phantomjs").path
    },
    specs: [
        // We are going to make this file in a minute
        "features/*.feature"
    ],
    baseUrl: "http://localhost:8100",
    framework: "cucumber",
    cucumberOpts: {
        format: "pretty",
        captureConsole: false
    },
    allScriptsTimeout: 20000,
    onPrepare: function() {
        "use strict";
        browser.get("/");
        require("protractor-http-mock").config = {
            rootDirectory: __dirname + "/../www", // default value: process.cwd()
            protractorConfig: "/../test/protractor.config" // default value: 'protractor.conf'
        };
    }
};
