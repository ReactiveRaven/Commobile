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
    baseUrl: "http://localhost:8101",
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
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
            rootDirectory: __dirname, // default value: process.cwd()
            protractorConfig: "protractor.config" // default value: 'protractor.conf'
        };
    }
};