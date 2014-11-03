module.exports = function(config) {
  config.set({

    basePath: "./../www/",

    files: [
      "lib/angular/angular.js",
      "lib/angular-mocks/angular-mocks.js",
      "lib/angular-animate/angular-animate.js",
      "lib/angular-sanitize/angular-sanitize.min.js",
      "lib/angular-ui-router/release/angular-ui-router.js",
      "lib/ng-modular-log/ngModularLog.js",
      "lib/ionic/js/ionic.js",
      "lib/ionic/js/ionic-angular.js",
      "js/**/*.js"
    ],

    autoWatch: true,

    frameworks: [ "jasmine" ],

    browsers: [ "PhantomJS" ],

    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    junitReporter: {
      outputFile: "test_out/unit.xml",
      suite: "unit"
    }

  });
};
