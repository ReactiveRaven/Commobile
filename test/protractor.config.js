exports.config = {
    capabilities: {
        // You can use other browsers
        // like firefox, phantoms, safari, IE (-_-)
        "browserName": "phantomjs",
        "phantomjs.binary.path": require("phantomjs").path
    },
    specs: [
        // We are going to make this file in a minute
        "e2e/**/*.spec.js"
    ],
    baseUrl: "http://localhost:8100",
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000, // 1 minute
        isVerbose: true
    },
    allScriptsTimeout: 20000,
    onPrepare: function() {
        "use strict";
        browser.get("/");
        require("protractor-http-mock").config = {
            rootDirectory: __dirname, // default value: process.cwd()
            protractorConfig: "protractor.config" // default value: 'protractor.conf'
        };
    }
};